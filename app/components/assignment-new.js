Encompass.AssignmentNewComponent = Ember.Component.extend(Encompass.CurrentUserMixin, {
  createAssignmentError: null,
  isMissingRequiredFields: null,
  selectedSection: null,
  selectedProblem: null,
  validator: Ember.inject.service('form-validator'),

  didInsertElement: function() {
    let formId = 'form#newassignmentform';
    this.set('formId', formId);

    let isMissing = this.checkMissing.bind(this);
    this.get('validator').initialize(formId, isMissing);
  },

  checkMissing: function() {
    const id = this.get('formId');
    let isMissing = this.get('validator').isMissingRequiredFields(id);
    this.set('isMissingRequiredFields', isMissing);
  },
  createAssignment: function() {
    console.log('creating Assignment');
    const that = this;

    const createdBy = that.get('currentUser');
    const section = that.get('section');
    const problem = that.get('problem');
    const assignedDate = that.get('assignedDate');
    const dueDate = that.get('dueDate');

    const createAssignmentData =   that.store.createRecord('assignment', {
      createdBy: createdBy,
      createDate: new Date(),
      section: section,
      problem: problem,
      assignedDate: assignedDate,
      dueDate: dueDate,
    });
      createAssignmentData.save()
          .then((assignment) => {
            that.sendAction('toAssignmentInfo', assignment);
            //TODO: decide how to handle clearing form and whether to redirect to the created assignment
            //that.get('validator').clearForm();
          })
          .catch((err) => {
            that.set('createAssignmentError', err);
          });

      },

  actions: {
    validate: function() {
      var that = this;
      return this.get('validator').validate(that.get('formId'))
      .then((res) => {
        console.log('res', res);
        if (res.isValid) {
          // proceed with assignment creation
          console.log('Form is Valid!');
          this.createAssignment();
        } else {
          if (res.invalidInputs) {
            this.set('isMissingRequiredFields', true);
            return;
          }
        }
      })
      .catch(console.log);
    },
  }
});

