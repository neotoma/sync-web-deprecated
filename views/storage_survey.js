App.StorageSurveyView = Ember.View.extend({
  templateName: 'storage_survey',
  tagName: 'form',
  isSubmitting: null,
  classNameBindings: ['isSubmitted'],

  isSubmitted: function() {
    return this.get('storageSurvey').get('isSubmitted');
  }.property('storageSurvey.isSubmitted'),

  isValid: function() {
    var validation = this.get('storageSurvey').get('validation');
    var isValid = true;
    var regex;

    // Email
    regex = new RegExp(validation.email.pattern);
    if ((validation.email.required && !this.get('storageSurvey').get('email')) || !regex.test(this.get('storageSurvey').get('email'))) {
      isValid = false;
    }

    // Preference
    regex = new RegExp(validation.preference.pattern, validation.preference.modifiers);
    if ((validation.preference.required && !this.get('storageSurvey').get('preference')) || !regex.test(this.get('storageSurvey').get('preference'))) {
      isValid = false;
    }

    console.log('isValid: ' + isValid);

    return isValid;
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