var Seeder = require('mongoose-data-seed').Seeder;
var Problem = require('../server/datasource/schemas').Problem;

var data = [
  {
    "_id": "5b4e25c638a46a41edf1709a",
    "title": "Rick's Public",
    "puzzleId": null,
    "text": "What is it?",
    "imageUrl": null,
    "sourceUrl": null,
    "additionalInfo": "Be careful!",
    "createdBy": "5b245760ac75842be3189525",
    "categories": ['5bb650e1fefbf3cf9e88f680', '5bb650e1fefbf3cf9e88f673'],
    "isPublic": true,
    "privacySetting" : 'E',
    "copyrightNotice": "Apple Corps.",
    "sharingAuth": "stolen goods",
    "author": "Paul McCartney",
    "isTrashed": false,
    "status": "approved",
    "createDate": "2018-09-12T15:22:36.371Z",
  }, {
    "_id": "5b4e2e56be1e18425515308c",
    "title": "Rick's Private",
    "puzzleId": null,
    "text": "What is it?",
    "imageUrl": null,
    "sourceUrl": null,
    "additionalInfo": "Be careful!",
    "createdBy": "5b245760ac75842be3189525",
    "categories": [],
    "isPublic": false,
    "privacySetting": 'M',
    "copyrightNotice": "Apple Corps.",
    "sharingAuth": "stolen goods",
    "author": "Steve Jobs",
    "isTrashed": false,
    "status": "approved",
    "createDate": "2018-09-04T15:22:36.371Z",
  }, {
    "_id": "5b4e2e6cbe1e18425515308d",
    "title": "Morty's Public",
    "puzzleId": null,
    "text": "What is it?",
    "imageUrl": null,
    "sourceUrl": null,
    "additionalInfo": "Be careful!",
    "createdBy": "5b245841ac75842be3189526",
    "categories": ['5bb650e1fefbf3cf9e88f673', '5bb650e1fefbf3cf9e88f677'],
    "privacySetting": 'E',
    "isTrashed": false,
    "status": "approved",
    "createDate": "2018-09-12T15:22:36.371Z",
    "organization": "5b4a64a028e4b75919c28512",
    "isUsed": false,
  }, {
    "_id": "5b1e7a0ba5d2157ef4c91028",
    "title": "Mr. W. Goes Across Australia",
    "createdBy": "5b245841ac75842be3189526",
    "puzzleId": 973,
    "categories": ['5bb650e1fefbf3cf9e88f675'],
    "isPublic": false,
    "privacySetting": 'M',
    "isTrashed": false,
    "organization": "5b4a64a028e4b75919c28512",
    "status": "approved",
    "createDate": "2018-09-08T15:22:36.371Z",
  },
  {
    "_id" : "5b91463c3add43b868ae9808",
    "title" : "DrexelU Org Problem",
    "puzzleId" : null,
    "text" : "This problem is only for members of Drexel University",
    "imageUrl" : null,
    "sourceUrl" : null,
    "imageData" : null,
    "imageId" : null,
    "additionalInfo" : null,
    "privacySetting" : "O",
    "createdBy" : "5b245841ac75842be3189526",
    "lastModifiedBy" : null,
    "origin" : null,
    "modifiedBy" : null,
    "organization" : "5b4a64a028e4b75919c28512",
    "categories" : [],
    "lastModifiedDate" : null,
    "isTrashed" : false,
    "createDate" : "2018-09-06T15:22:36.371Z",
    "status": "approved",
  },
  {
    "_id" : "5b9173e23da5efca74705772",
    "title" : "Summer's Org Problem",
    "puzzleId" : null,
    "text" : "This is Summer's problem",
    "imageUrl" : null,
    "sourceUrl" : null,
    "imageData" : null,
    "imageId" : null,
    "additionalInfo" : "",
    "privacySetting" : "O",
    "createdBy" : "5b9149552ecaf7c30dd4748e",
    "lastModifiedBy" : null,
    "origin" : null,
    "modifiedBy" : null,
    "organization" : "5b4e4d5f808c7eebc9f9e82c",
    "categories" : [],
    "lastModifiedDate" : null,
    "isTrashed" : false,
    "isUsed": true,
    "createDate" : "2018-09-06T18:37:22.437Z",
    "status": "approved",
  },
  {
    "_id" : "5ba7c3cb1359dc2f6699f2b3",
    "title" : "Tim's Public Problem",
    "puzzleId" : null,
    "text" : "This problem is for everyone.",
    "imageUrl" : null,
    "sourceUrl" : null,
    "additionalInfo" : null,
    "privacySetting" : "E",
    "error" : null,
    "createdBy" : "5ba7bedd2b7ba22c38a554fc",
    "lastModifiedBy" : null,
    "image" : null,
    "origin" : null,
    "modifiedBy" : null,
    "organization" : "5b4e4b48808c7eebc9f9e828",
    "categories" : [],
    "lastModifiedDate" : null,
    "isTrashed" : false,
    "createDate" : "2018-09-23T16:48:11.924Z",
    "status": "approved"
  },
  {
    "_id" : "5bbd123aecd6e597fd89d7f3",
    "isTrashed" : true,
    "createdBy": "5ba7bedd2b7ba22c38a554fc",
    "title": "trashed problem",
    "status": "flagged",
    "flagReason" : {
      "flaggedDate" : "2018-10-29T16:19:38.696Z",
      "reason" : "because",
      "flaggedBy" : "5b245760ac75842be3189525"
    }
  },
  {
    "_id": "5b4e2e6cbe1e18425515308e",
    "title": "Morty's Pending Public",
    "text": "Please approve my problem",
    "imageUrl": null,
    "sourceUrl": null,
    "additionalInfo": "Be careful!",
    "createdBy": "5b245841ac75842be3189526",
    "categories": ['5bb650e1fefbf3cf9e88f680'],
    "privacySetting": 'E',
    "isTrashed": false,
    "status": "pending",
    "createDate": "2018-10-29T16:19:38.696Z",
    "copyrightNotice": null,
    "sharingAuth": null,
    "author": "Morty Smith",
    "image": null,
    "organization": "5b4a64a028e4b75919c28512",
    "keywords": null,
    "isUsed": false,
  },
  {
    "_id": "5b4e2e6cbe1e18425515308f",
    "title": "Morty's Flagged Public",
    "text": "Please approve my problem",
    "imageUrl": null,
    "sourceUrl": null,
    "additionalInfo": "Be careful!",
    "createdBy": "5b245841ac75842be3189526",
    "categories": ['5bb650e1fefbf3cf9e88f680'],
    "privacySetting": 'E',
    "isTrashed": false,
    "status": "flagged",
    "createDate": "2018-10-26T16:19:38.696Z",
    "origin": null,
    "copyrightNotice": null,
    "sharingAuth": null,
    "author": null,
    "image": null,
    "organization": "5b4a64a028e4b75919c28512",
    "keywords": "",
    "isUsed": false,
    "flagReason": {
      "flaggedBy": "5b245760ac75842be3189525",
      "reason": "Not good problem",
      "flaggedDate": "2018-10-29T16:19:38.696Z",
    }
  },
  {
    "_id": "5b4e2e6cbe1e18425515304e",
    "title": "Alphabetical Problem",
    "text": "This problem should show first",
    "imageUrl": null,
    "sourceUrl": null,
    "additionalInfo": "Be careful!",
    "createdBy": "5b245841ac75842be3189526",
    "categories": ['5bb650e1fefbf3cf9e88f680'],
    "privacySetting": 'E',
    "isTrashed": false,
    "status": "approved",
    "createDate": "2018-10-26T16:19:38.696Z",
    "origin": null,
    "copyrightNotice": null,
    "sharingAuth": null,
    "author": null,
    "image": null,
    "organization": "5b4a64a028e4b75919c28512",
    "keywords": "",
    "isUsed": false,
  },
  {
    "_id": "53a4479432f2863240000339",
    "title": "Zebra Problem",
    "text": "This problem should show last",
    "imageUrl": null,
    "sourceUrl": null,
    "additionalInfo": "Be careful!",
    "createdBy": "5b4e4b48808c7eebc9f9e827",
    "categories": ['5bb650e1fefbf3cf9e88f680'],
    "privacySetting": 'E',
    "isTrashed": false,
    "status": "pending",
    "createDate": "2018-10-16T16:19:38.696Z",
    "origin": null,
    "copyrightNotice": null,
    "sharingAuth": null,
    "author": null,
    "image": null,
    "organization": "5b4a64a028e4b75919c28512",
    "keywords": "",
    "isUsed": false,
  },
  {
    "_id": "53a447b432f286324000033d",
    "title": "Newest Problem",
    "text": "This problem should show first when sorted date",
    "imageUrl": null,
    "sourceUrl": null,
    "additionalInfo": "Be careful!",
    "createdBy": "5b245841ac75842be3189526",
    "categories": ['5bb650e1fefbf3cf9e88f680'],
    "privacySetting": 'E',
    "isTrashed": false,
    "status": "pending",
    "createDate": "2021-10-13T16:19:38.696Z",
    "origin": null,
    "copyrightNotice": null,
    "sharingAuth": null,
    "author": null,
    "image": null,
    "organization": "5b4a64a028e4b75919c28512",
    "keywords": "",
    "isUsed": false,
  },
  {
    "_id": "5bac07fdea4c0a230b2c7cda",
    "title": "Oldest Problem",
    "text": "This problem should show last when sorted date",
    "imageUrl": null,
    "sourceUrl": null,
    "additionalInfo": "Be careful!",
    "createdBy": "5b4e4b48808c7eebc9f9e827",
    "categories": ['5bb650e1fefbf3cf9e88f680'],
    "privacySetting": 'E',
    "isTrashed": false,
    "status": "approved",
    "createDate": "2017-12-13T16:19:38.696Z",
    "origin": null,
    "copyrightNotice": null,
    "sharingAuth": null,
    "author": null,
    "image": null,
    "organization": "5b4a64a028e4b75919c28512",
    "keywords": "",
    "isUsed": false,
  },
  {
    "_id": "5bac07fdea4c0a230b2c7cec",
    "title": "Temple Problem",
    "text": "This problem has temple as org",
    "imageUrl": null,
    "sourceUrl": null,
    "additionalInfo": "Be careful!",
    "createdBy": "5b4e4b48808c7eebc9f9e827",
    "categories": ['5bb650e1fefbf3cf9e88f680'],
    "privacySetting": 'E',
    "isTrashed": false,
    "status": "approved",
    "createDate": "2018-08-13T16:19:38.696Z",
    "origin": null,
    "copyrightNotice": null,
    "sharingAuth": null,
    "author": null,
    "image": null,
    "organization": "5b4e4b48808c7eebc9f9e828",
    "keywords": "",
    "isUsed": false,
  },
];

var ProblemsSeeder = Seeder.extend({
  shouldRun: function () {
    return Problem.count().exec().then(count => count === 0);
  },
  run: function () {
    return Problem.create(data);
  }
});

module.exports = ProblemsSeeder;
