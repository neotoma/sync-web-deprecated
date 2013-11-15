App.IndexController = Ember.ObjectController.extend({
  isSubmitted: null,
  isSubmitting: null,

  isValid: function() {
    var regex;

    // Email
    regex = new RegExp(this.get('validation').email.pattern);
    if ((this.get('model').get('validation').email.required && !this.get('model').get('email')) || !regex.exec(this.get('model').get('email'))) {
      return false;
    }

    // Preference
    regex = new RegExp(this.get('model').get('validation').preference.pattern);
    if ((this.get('model').get('validation').preference.required && !this.get('model').get('preference')) || !regex.exec(this.get('model').get('preference'))) {
      return false;
    }

    return true;
  }.property('email', 'preference'),

  isDisabled: function() {
    return (!this.get('isValid') || this.get('isSubmitting'));
  }.property('isValid', 'isSubmitting'),

  submitLabel: function() {
    if (this.get('isSubmitting')) {
      return 'Submitting...';
    } else if (this.get('isSubmitted')) {
      return '&#10003; Submitted';
    } else {
      return 'Notify Me';
    }
  }.property('isSubmitting', 'isSubmitted'),

	actions: {
		submit: function() {
      this.set('isSubmitting', true);
      target = this;

      App.StorageSurvey.post(
        this.get('model'), 
        function(response) {
          target.set('isSubmitting', false);
          target.set('isSubmitted', true);
        }, 
        function(reason) {
          target.set('isSubmitting', false);
          $("#storage-survey form").effect('shake', { distance: 15 });
        }
      );
    }
	}
});