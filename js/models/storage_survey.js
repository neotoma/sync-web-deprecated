App.StorageSurvey = Ember.Object.extend({
	resource: 		'/storage-survey',
	email: 			null,
	preference: 	null,
	submitted: 		null,
	validation: {
		email: {
			pattern: 	'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}',
			required: 	true
		},
		preference: {
			pattern: 	'.{3,}',
			required: 	true
		}
	},
	init: function() {
		target = this;

		this.GET(
			this.get('resource'),
			function(response) { 
				if (response.email && response.preference) {
					target.set('email', response.email);
					target.set('preference', response.preference);
					target.set('submitted', true);
				}
			}
		);
	},

	data: function() {
		return {
			email: 			this.get('email'),
			preference: 	this.get('preference')
		};
	}.property('email', 'preference'),

	save: function() {
		this.POST(
			'/storage-survey', 
			this.get('data'),
			function(response) {
				target.set('submitted', true);
			},
			function(response) {
				$("#storage-survey-form").effect('shake', { distance: 15 });
			}
		);
	},

	isValid: function() {
		var regex;

		// Email
		regex = new RegExp(this.get('validation').email.pattern);
		if ((this.get('validation').email.required && !this.get('email')) || !regex.exec(this.get('email'))) {
			return false;
		}

		// Preference
		regex = new RegExp(this.get('validation').preference.pattern);
		if ((this.get('validation').preference.required && !this.get('preference')) || !regex.exec(this.get('preference'))) {
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
		} else if (this.get('submitted')) {
			return '&#10003; Submitted';
		} else {
			return 'Notify Me';
		}
	}.property('isSubmitting', 'submitted')
});