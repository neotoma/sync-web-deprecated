App.StorageSurveyView = Ember.View.extend({
  templateName: 'storage_survey',
  tagName: 'form',
  isSubmitting: null,
  classNameBindings: ['isSubmitted'],

  isSubmitted: function() {
    return this.get('storageSurvey.isSubmitted');
  }.property('storageSurvey.isSubmitted'),

  isValid: function() {
    var validation = this.get('storageSurvey.validation');
    var isValid = true;
    var regex;

    // Email
    regex = new RegExp(validation.email.pattern);
    if ((validation.email.required && !this.get('storageSurvey.email')) || !regex.test(this.get('storageSurvey.email'))) {
      isValid = false;
    }

    // Preference
    regex = new RegExp(validation.preference.pattern, validation.preference.modifiers);
    if ((validation.preference.required && !this.get('storageSurvey.preference')) || !regex.test(this.get('storageSurvey.preference'))) {
      isValid = false;
    }

    return isValid;
  }.property('storageSurvey.email', 'storageSurvey.preference'),

  isDisabled: function() {
    return (!this.get('isValid') || this.get('isSubmitting'));
  }.property('isValid', 'isSubmitting'),

  submitLabel: function() {
    if (this.get('isSubmitting')) {
      return 'Submitting...';
    } else if (this.get('storageSurvey.isSubmitted')) {
      return '&#10003; Submitted';
    } else {
      return 'Notify Me';
    }
  }.property('isSubmitting', 'storageSurvey.isSubmitted'),

  submit: function(event) {
    $('#storage-survey').find('input').blur();
    this.set('isSubmitting', true);
    target = this;

    this.get('storageSurvey').save().then(
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