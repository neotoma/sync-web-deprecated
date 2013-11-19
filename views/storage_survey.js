App.StorageSurveyView = Ember.View.extend({
  templateName: 'storage_survey',
  tagName: 'form',
  isSubmitting: null,
  classNameBindings: ['isSubmitted'],

  isSubmitted: function() {
    return this.get('storageSurvey').get('isSubmitted');
  }.property('storageSurvey.isSubmitted'),

  isValid: function() {
    var regex;

    // Email
    regex = new RegExp(this.get('storageSurvey').get('validation').email.pattern);
    if ((this.get('storageSurvey').get('validation').email.required && !this.get('storageSurvey').get('email')) || !regex.exec(this.get('storageSurvey').get('email'))) {
      return false;
    }

    // Preference
    regex = new RegExp(this.get('storageSurvey').get('validation').preference.pattern);
    if ((this.get('storageSurvey').get('validation').preference.required && !this.get('storageSurvey').get('preference')) || !regex.exec(this.get('storageSurvey').get('preference'))) {
      return false;
    }

    return true;
  }.property('storageSurvey.email', 'storageSurvey.preference'),

  isDisabled: function() {
    return (!this.get('isValid') || this.get('isSubmitting'));
  }.property('isValid', 'isSubmitting'),

  submitLabel: function() {
    if (this.get('isSubmitting')) {
      return 'Submitting...';
    } else if (this.get('storageSurvey').get('isSubmitted')) {
      return '&#10003; Submitted';
    } else {
      return 'Notify Me';
    }
  }.property('isSubmitting', 'storageSurvey.isSubmitted'),

  submit: function(event) {
    this.set('isSubmitting', true);
    target = this;

    App.StorageSurvey.post(
      this.get('storageSurvey'), 
      function(response) {
        target.set('isSubmitting', false);
        target.get('storageSurvey').set('isSubmitted', true);
      }, 
      function(reason) {
        target.set('isSubmitting', false);
        $("#storage-survey form").effect('shake', { distance: 15 });
      }
    );
  }
});