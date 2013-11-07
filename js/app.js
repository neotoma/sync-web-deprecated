var patterns = {
	email: '[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}'
}

App = Ember.Application.create();

Ember.TextField.reopen({
	attributeBindings: ['spellcheck', 'autocomplete', 'pattern', 'required']
});

App.CheckboxView = Ember.View.extend({
	tagName: 'checkboxset'
})

Ember.Handlebars.registerBoundHelper('pluralize', function(number, opts) {
  var single = opts.hash['s'];
  Ember.assert('pluralize requires a singular string (s)', single);
  var plural = opts.hash['p'] || single + 's';
  return (number == 1) ? single : plural;
});

App.User = Ember.Object.extend({
	ID: 			null,
	email: 			null,
	status: 		0,		// 0: pending load, 1: loaded, 2: error loading
	init: function() {
		target = this;

		$.ajax({ url: '/user', dataType: 'json', async: false }).then(
			function(response) {
				target.set('ID', response.ID);
				target.set('email', response.email);
				target.set('status', 1);
			}, 
			function(error) {
				target.set('status', 2);
			}
		);
	}
});

App.Storages = Ember.Object.extend({
	collection: 	[],
	status: 		0,		// 0: pending load, 1: loaded, 2: error loading
	init: function() {
		target = this;

		$.ajax({ url: '/storages', dataType: 'json', async: false }).then(
			function(response) {
				target.set('collection', response);
				target.set('status', 1);
			}, 
			function(error) {
				target.set('status', 2);
			}
		);
	}
});

App.StorageSurvey = Ember.Object.extend({
	email: 			null,
	preference: 	null,
	saved: 			false,
	isSaving: 		false,
	status: 		0,		// 0: pending load, 1: loaded, 2: error loading
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
				target.set('status', 1);
			}, 
			function(error) {
				target.set('status', 2);
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

	loaded: function() {
		return this.get('status') == 1 ? true : false
	}.property('status'),

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
	collection: 	[],
	status: 		0,		// 0: pending load, 1: loaded, 2: error loading

	init: function() {
		target = this;

		$.ajax({ url: '/sources', dataType: 'json', async: false }).then(
			function(responseJSON) {
				var collection = [];

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

					source.set('contentTypes', contentTypes);
					collection.push(source);
				});

				target.set('collection', collection);
				target.set('status', 1);
			}, 
			function(error) {
				target.set('status', 2);
			}
		);
	},

	totalConnectedSources: function() {
		var total = 0;

		$.each(this.get('collection'), function(key, source) {
			if (source.connected) {
				total++;
			}
		});

		return total;
	}.property('collection.@each.connected'),

	hasConnectedSources: function() {
		return (this.get('totalConnectedSources') > 0);
	}.property('totalConnectedSources'),

	totalEnabledContentTypes: function() {
		var total = 0;

		$.each(this.get('collection'), function(key, source) {
			if (this.get('connected')) {
				total += source.get('totalEnabledContentTypes');
			}
		});

		return total;
	}.property('collection.@each.totalEnabledContentTypes', 'collection.@each.connected'),

	loaded: function() {
		return this.get('status') == 1 ? true : false
	}.property('status'),

	disabled: function() {
		return (!this.get('totalEnabledContentTypes'));
	}.property('totalEnabledContentTypes')
});

App.Source = Ember.Object.extend({
	ID: 			null,	// string
	name: 			null,	// string
	contentTypes: 	null,	// array
	connected: 		false,	// boolean

	totalEnabledContentTypes: function() {
		var total = 0;

		$.each(this.get('contentTypes'), function(key, contentType) {
			if (contentType.enabled) {
				total++;
			}
		});

		return total;
	}.property('contentTypes.@each.enabled'),

	connectLabel: function() {
		if (this.get('connected')) {
			return '&#10003; Connected';
		} else {
			return 'Connected';
		}
	}.property('connected')
});

App.ContentType = Ember.Object.extend({
	ID: 			null,	// string		
	name: 			null, 	// string
	namePlural: 	null,	// string
	enabled: 		false,	// boolean
	source: 		null,	// App.Source

	comboID: function() {
		return this.get('source').get('ID') + '-' + this.get('ID');
	}.property('source', 'ID'),

	disabled: function() {
		return (!this.get('source').connected);
	}.property('source.connected')
});

App.Router.map(function() {
	this.route('sources');
	this.route('sync');
});

App.IndexRoute = Ember.Route.extend({
	setupController: function(controller, model) {
		var storages 		= App.Storages.create({});
		var storageSurvey 	= App.StorageSurvey.create({});

		if(storages.collection.length) {
			var sources = App.Sources.create({});

			if(sources.get('hasConnectedSources')) {
				this.transitionTo('sync');
			} else {
				this.transitionTo('sources');
			}
		}

		controller.set('model', {
			storageSurvey: storageSurvey 
		});
	}
});

App.IndexController = Ember.ObjectController.extend({
	actions: {
		connectDropbox: function() {
			this.transitionTo('sources');
		},
		submitSurvey: function() {
			this.get('model').storageSurvey.save();
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
		},
		toggleConnection: function(source) {
			if (source.get('connected')) {
				if (confirm('Are you sure you want to disconnect ' + source.get('name') + '?')) {
					source.set('connected', false);
				}
			} else {
				source.set('connected', true);
			}
		},
		disconnectSource: function(source) {
			source.set('connected', false);
		}
	}
});