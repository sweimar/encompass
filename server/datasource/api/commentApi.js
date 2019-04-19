/**
  * # Comment API
  * @description This is the API for comment based requests
  * @author Damola Mabogunje <damola@mathforum.org>
  * @since 1.0.0
  */
/* jshint ignore:start */
//REQUIRE MODULES
const _ = require('underscore');
const logger = require('log4js').getLogger('server');
const moment = require('moment');

//REQUIRE FILES
const models   = require('../schemas');
const userAuth = require('../../middleware/userAuth');
const utils    = require('../../middleware/requestHandler');
const wsAccess   = require('../../middleware/access/workspaces');
const access   = require('../../middleware/access/comments');
const asyncWrapper = utils.asyncWrapper;

const { isValidMongoId } = require('../../utils/mongoose');

module.exports.get = {};
module.exports.post = {};
module.exports.put = {};

/**
  * @public
  * @method getComments
  * @description __URL__: /api/comments
  * @returns {Object} A 'named' array of comment objects
  * @throws {NotAuthorizedError} User has inadequate permissions
  * @throws {InternalError} Data retrieval failed
  * @throws {RestError} Something? went wrong
  */
async function getComments(req, res, next) {
  let user = userAuth.requireUser(req);
  let criteria;

  let { ids, page, createdBy, workspace, submission } = req.query;

  try {
    if (ids) {
      criteria = await access.get.comments(user, ids);
    } else {
      criteria = await access.get.comments(user, null);
    }
  }catch(err) {
    console.error('error getComments', err);
    console.trace();
  }

  let textSearch = req.query.text;
  let byRelevance = false;

  // Determine what comments can be searched
  if(textSearch) {
    byRelevance = true;
    criteria.$text = {
      $search: textSearch
    };
  }

  if(isValidMongoId(createdBy)) {
    criteria.createdBy = createdBy;
  }

  if (isValidMongoId(workspace)) {
    criteria.workspace = workspace;
  }

  if (isValidMongoId(submission)) {
    criteria.submission = submission;
  }

  let sinceDate = req.query.sinceDate;
  if (sinceDate) {
    let startMoment = moment(sinceDate, 'L').startOf('day');
    let startDateObj = new Date(startMoment);

    criteria.createDate = {$gte: startDateObj};
  }

  let workspaces = req.query.workspaces;

  if(workspaces) {
    criteria.workspace = {$in: req.query.workspaces};
  }

  //see comment on ENC-488 this isn't gonna work (need JOIN/multiple queries or denormalization)
  //var selectionTextSearch = req.query.selectionText;
  //if(selectionTextSearch) {
  //  var regExp = new RegExp(selectionTextSearch, 'i');
  //  searchCriteria.$or.push({text: regExp});
  //}

  let results, itemCount;

  let sortParam = { createDate: 1 };


  if (byRelevance) {
    sortParam = { score: { $meta: "textScore" } };

    [ results, itemCount ] = await Promise.all([
      models.Comment.find(criteria, { score: {$meta: "textScore"}})
        .sort(sortParam)
        .limit(req.query.limit)
        .skip(req.skip)
        .populate('selection')
        .populate('submission')
        .populate('createdBy')
        .populate('workspace')
        .lean().exec(),
      models.Comment.count(criteria)
    ]);
  } else {
    [ results, itemCount ] = await Promise.all([
      models.Comment.find(criteria).sort(sortParam).limit(req.query.limit).skip(req.skip).populate('selection')
      .populate('submission')
      .populate('workspace')
      .populate('createdBy').lean().exec(),
      models.Comment.count(criteria)
    ]);
  }
  const pageCount = Math.ceil(itemCount / req.query.limit);
  let currentPage = page;
  if (!currentPage) {
    currentPage = 1;
  }
     let data = {
       comments: [],
       meta: {
        total: itemCount,
        pageCount,
        currentPage
      }
    };
     let dataMap = {createdBy: 'user'};
     let relatedData = {
        selection: {},
        submission: {},
        workspace: {},
        createdBy: {}
      };

      //this would probably be better done as an aggregate?
      //we're just massaging the data into an ember friendly format for side-loading
      results.forEach((comment) => {
        let hasMissingRelationship = false;

        _.keys(relatedData).forEach(function(key){
          if(comment[key]){
            relatedData[key][comment[key]._id] = comment[key];
            comment[key] = comment[key]._id;
          } else {
            hasMissingRelationship = true;

            logger.error('comment ' + comment._id + ' missing ' + key);
            delete comment[key];
          }
        });
        if (!hasMissingRelationship) {
          data.comments.push(comment);
        }
      });

      _.keys(relatedData).forEach(function(key){
        let modelName = key;
        if(dataMap[key]) {
          modelName = dataMap[key];
        }
        data[modelName] = _.values(relatedData[key]);
      });

      utils.sendResponse(res, data);

}

/**
  * @public
  * @method getComment
  * @description __URL__: /api/comments/:id
  * @returns {Object} A 'named' comment object
  * @throws {NotAuthorizedError} User has inadequate permissions
  * @throws {InternalError} Data retrieval failed
  * @throws {RestError} Something? went wrong
  */
async function getComment(req, res, next) {
  const user = userAuth.requireUser(req);

  if (!user) {
    return utils.sendError.InvalidCredentialsError('You must be logged in.', res);
  }

  let err;
  let canLoadComment;
  let comment;

  let id = req.params.id;

  [ err, comment ] = await asyncWrapper(models.Comment.findById(id));

  if (err) {
    console.error(`Error finding comment by id: ${err}`);
    console.trace();
    return utils.sendError.InternalError(null, res);
  }

  if (!comment || comment.isTrashed) { // record not found in db
    return utils.sendResponse(res, null);
  }

  [ err, canLoadComment ] = await asyncWrapper(access.get.comment(user, id));

  if (err) {
    console.error(`Error getComment: ${err}`);
    console.trace();
    return utils.sendError.InternalError(null, res);
  }

  if (!canLoadComment) { // user does not have permission to access comment
    return utils.sendError.NotAuthorizedError('You do not have permission.', res);
  }

  const data = { // user has permission; send back record
    comment
  };

  return utils.sendResponse(res, data);
}

/**
  * @public
  * @method postComment
  * @description __URL__: /api/comments
  * @throws {NotAuthorizedError} User has inadequate permissions
  * @throws {InternalError} Data saving failed
  * @throws {RestError} Something? went wrong
  */
function postComment(req, res, next) {
  var user = userAuth.requireUser(req);
  var workspaceId = req.body.comment.workspace;
  models.Workspace.findById(workspaceId).lean().populate('owner').populate('editors').populate('createdBy').exec(function(err, ws){
    if (err) {
      logger.error(err);
      return utils.sendError.InternalError(err, res);
    }
    if(wsAccess.canModify(user, ws, 'comments', 2)) {
      var comment = new models.Comment(req.body.comment);
      comment.createdBy = user;
      comment.createDate = Date.now();
      comment.save(function(err, doc) {
        if(err) {
          logger.error(err);
          return utils.sendError.InternalError(err, res);
        }
        var data = {'comment': doc};
        utils.sendResponse(res, data);
      });
    } else {
      logger.info("permission denied");
      res.send(403, "You don't have permission for this workspace");
    }
  });
}

/**
  * @public
  * @method putComment
  * @description __URL__: /api/comments/:id
  * @throws {NotAuthorizedError} User has inadequate permissions
  * @throws {InternalError} Data update failed
  * @throws {RestError} Something? went wrong
  */
function putComment(req, res, next) {

  var user = userAuth.requireUser(req);
  var workspaceId = req.body.comment.workspace;
  models.Workspace.findById(workspaceId).lean().populate('owner').populate('editors').populate('createdBy').exec(function(err, ws){
    if (err) {
      logger.error(err);
      return utils.sendError.InternalError(err, res);
    }
    if(_.isEqual(user.id, req.body.comment.createdBy) || wsAccess.canModify(user, ws, 'comments', 3)) {

      models.Comment.findById(req.params.id,
        function (err, doc) {
          if(err) {
            logger.error(err);
            return utils.sendError.InternalError(err, res);
          }

          for(var field in req.body.comment) {
            if((field !== '_id') && (field !== undefined)) {
              doc[field] = req.body.comment[field];
            }
          }
          doc.save(function (err, comment) {
            if(err) {
              logger.error(err);
              return utils.sendError.InternalError(err, res);
            }

            var data = {'comment': comment};
            utils.sendResponse(res, data);
          });
        }
      );
    } else { //not permitted
      logger.info("permission denied");
      return utils.sendError.NotAuthorizedError(`You don't have permission for this workspace`, res);
    }
  });
}

module.exports.get.comments = getComments;
module.exports.get.comment = getComment;
module.exports.post.comment = postComment;
module.exports.put.comment = putComment;
/* jshint ignore:end */