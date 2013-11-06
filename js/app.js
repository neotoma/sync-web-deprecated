var patterns = {
	email: '[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}'
}

App = Ember.Application.create();

Ember.TextField.reopen({
	attributeBindings: ['spellcheck', 'autocomplete', 'pattern', 'required']
});

App.StorageSurvey = Ember.Object.extend({
	email: 			null,
	preference: 	null,
	saved: 			false,
	isSaving: 		false,
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
		target = this;

		$.ajax({ url: '/storage-survey', dataType: 'json' }).then(
			function(response) {
				if (response.email && response.preference) {
					target.set('email', response.email);
					target.set('preference', response.preference);
					target.set('saved', true);
				}
			}, 
			function(error) {

			}
		);
	},
	save: function() {
		var data = {
			email: 			this.get('email'),
			preference: 	this.get('preference')
		};

		target = this;

		this.set('isSaving', true);

		$.ajax({ url: '/storage-survey', dataType: 'json', type: 'post', data: data }).then(
			function(response) {
				target.set('isSaving', false);
				target.set('saved', true);
			}, 
			function(error) {
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

App.Sources = Ember.Object.extend({
	sources: 		[],
	status: 		0,		// 0: pending load, 1: loaded, 2: error loading

	init: function() {
		target = this;

		$.ajax({ url: '/sources', dataType: 'json' }).then(
			function(responseJSON) {
				var sources = [];

				$.each(responseJSON, function(key, sourceJSON) {
					var source = App.Source.create({ 
						ID: 				sourceJSON.ID,
						name:   			sourceJSON.name,
						contentTypes: 		[],
						connected: 			sourceJSON.connected
					});

					var contentTypes = [];

					$.each(sourceJSON.contentTypes, function(key, contentTypeJSON) {
						contentTypes.push(
							App.ContentType.create({
								ID: 			contentTypeJSON.ID,
								name: 			contentTypeJSON.name,
								namePlural: 	contentTypeJSON.namePlural,
								enabled: 		contentTypeJSON.enabled,
								source: 		source
							})
						);
					});

					source.contentTypes = contentTypes;
					sources.push(source);
				});

				target.set('sources', sources);
				target.set('status', 1);
			}, 
			function(error) {
				target.set('status', 2);
			}
		);
	},

	totalConnectedSources: function() {
		var total = 0;

		$.each(this.get('sources'), function(key, source) {
			if (source.connected) {
				total++;
			}
		});

		return total;
	}.property('s'),

	hasConnectedSources: function() {
		return (this.get('totalConnectedSources') > 0);
	}.property('totalConnectedSources'),

	totalEnabledContentTypes: function() {
		var total = 0;

		$.each(this.get('sources'), function(key, source) {
			$.each(source.get('contentTypes'), function(key, contentType) {
				if (contentType.enabled) {
					total++;
				}
			});
		});

		return total;
	}.property('sources'),

	loaded: function() {
		return this.get('status') == 1 ? true : false
	}.property('status'),

	disabled: function() {
		return (!this.get('hasConnectedSources'));
	}.property('hasConnectedSources')
});

App.Source = Ember.Object.extend({
	ID: 			null,	// string
	name: 			null,	// string
	contentTypes: 	null,	// array
	connected: 		false	// boolean
});

App.ContentType = Ember.Object.extend({
	ID: 			null,	// string		
	name: 			null, 	// string
	namePlural: 	null,	// string
	enabled: 		false,	// boolean
	source: 		null,	// App.Source

	disabled: function() {
		return (!this.get('source').connected);
	}.property('source')
});

App.Router.map(function() {
	this.route('sources');
	this.route('sync');
});

App.IndexRoute = Ember.Route.extend({
	setupController: function(controller, model) {
		var storageSurvey = App.StorageSurvey.create({});
		controller.set('model', storageSurvey);
	}
});

App.IndexController = Ember.ObjectController.extend({
	actions: {
		connectDropbox: function() {
			this.transitionTo('sources');
		},
		submitSurvey: function() {
			this.get('model').save();
		}
	}
});

App.SourcesRoute = Ember.Route.extend({
	setupController: function(controller, model) {
		var sources = App.Sources.create({});
		controller.set('model', sources);
	}
});

App.SourcesController = Ember.ObjectController.extend({
	actions: {
		sync: function() {
			this.transitionTo('sync');
		}
	}
});