var patterns = {
	email: '[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}'
}

App = Ember.Application.create();

App.StorageSurvey = Ember.Object.extend({
	email: null,
	preference: null,
	saved: false,
	isSaving: false,
	validation: {
		email: {
			pattern: patterns.email,
			required: true
		},
		preference: {
			pattern: '.{3,}',
			required: true
		}
	},
	init: function() {
		console.log('initializing storage survey');
		target = this;

		$.ajax({ url: '/storage-survey', dataType: 'json' }).then(
			function(response) {
				console.log(response);
				console.log('initialized storage survey');

				if (response.email && response.preference) {
					target.set('email', response.email);
					target.set('preference', response.preference);
					target.set('saved', true);
				}
			}, 
			function(error) {
				console.log('failed to initialize storage survey');
			}
		);
	},
	save: function() {
		var data = {
			email: 			this.get('email'),
			preference: 	this.get('preference')
		};

		target = this;

		console.log('saving storage survey');
		console.log(data);

		this.set('isSaving', true);

		$.ajax({ url: '/storage-survey', dataType: 'json', type: 'post', data: data }).then(
			function(response) {
				// why is response undefined with mockjax here?
				console.log('response: ' + response.stringify)
				console.log('saved storage survey');
				target.set('isSaving', false);
				target.set('saved', true);
			}, 
			function(error) {
				console.log('failed to save storage survey');
				target.set('isSaving', false);
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

	disabled: function() {
		return (!this.get('isValid') || this.get('isSaving'));
	}.property('isValid', 'isSaving'),

	submitLabel: function() {
		if (this.get('isSaving')) {
			return 'Submitting...';
		} else if (this.get('saved')) {
			return '&#10003; Submitted';
		} else {
			return 'Notify Me';
		}
	}.property('isSaving', 'saved')
});

Ember.TextField.reopen({
	attributeBindings: ['spellcheck', 'autocomplete', 'pattern', 'required']
});

App.Router.map(function() {
	this.route('sources');
	this.route('sync');
});

App.IndexRoute = Ember.Route.extend({
	setupController: function(controller, model) {
		console.log('setting up controller');
		var storageSurvey = App.StorageSurvey.create({
		});
		controller.set('model', storageSurvey);
	}
});

App.IndexController = Ember.ObjectController.extend({
	actions: {
		connectDropbox: function() {
			this.transitionTo('sources');
		},
		submitSurvey: function() {
			console.log('submitting survey');
			this.get('model').save();
		}
	}
});

App.SourcesController = Ember.ObjectController.extend({
	actions: {
		sync: function() {
			this.transitionTo('sync');
		}
	}
});