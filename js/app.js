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

Ember.Object.reopen({
	/* Status Codes:
	 * 1: synced
	 * 2: syncing from server
	 * 3: syncing to server
	 * 4: sync failed
	 */
	status: null,

	GET: function(url, doneCallback, failCallback) {
		target = this;
		target.set('status', 2);

		$.ajax({ url: url, dataType: 'json' }).then(

			// Done
			function(response) {
				if (doneCallback) {
					doneCallback(response);
				}

				target.set('status', 1);
			}, 

			// Fail
			function(error) {
				if (failCallback){
					failCallback(response);
				}

				target.set('status', 4);
			}
		);
	},

	POST: function(url, data, doneCallback, failCallback) {
		target = this;
		this.set('status', 3);

		$.ajax({ url: url, dataType: 'json', type: 'post', data: data }).then(
			
			// Done
			function(response) {
				if (doneCallback) {
					doneCallback(response);
				}

				target.set('status', 1);
			}, 

			// Fail
			function(error) {
				if (failCallback){
					failCallback(response);
				}

				target.set('status', 4);
			}

		);
	},

	isLoading: function() {
		return (this.get('status') == null || this.get('status') == 2);
	}.property('status'),

	isSubmitting: function() {
		return (this.get('status') == 3);
	}.property('status')
});

App.User = Ember.Object.extend({
	resource: 		'/user',
	ID: 			null,
	email: 			null,
	init: function() {
		this.GET(
			this.get('resource'),
			function(response) {
				target.set('ID', response.ID);
				target.set('email', response.email);
			}
		);
	}
});

App.Storages = Ember.Object.extend({
	resource: 		'/storages',
	collection: 	[],

	init: function() {
		this.GET(
			this.get('resource'),
			function(responseJSON) {
				var collection = [];

				$.each(responseJSON, function(key, storageJSON) {
					collection.push(App.Storage.create(storageJSON));
				});

				target.set('collection', collection);
			}
		);
	},

	observeCollection: function() {
		console.log('Collection: ' + this.get('collection').length);
	}.observes('collection')
});

App.Storage = Ember.Object.extend({
	ID: 	null,
	name: 	null,
	size: 	null,
	allocations: {
		available: 	null,
		occupied: 	null,
		other: 		null
	},

	resource: function() {
		return '/storages/' + self.get('ID');
	}.property('ID'),
});

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

App.Sources = Ember.Object.extend({
	collection: 	[],

	init: function() {
		this.GET(
			'/sources',
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
			}
		);
	},

	data: function() {
		return {
			// ?
		};
	}.property(),

	save: function() {
		this.POST(
			'/sources', 
			this.get('data'),
			null, // ?
			null // ?
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
		console.log('total enabled content types (sources)');
		var total = 0;

		$.each(this.get('collection'), function(key, source) {
			if (this.get('connected')) {
				total += source.get('totalEnabledContentTypes');
			}
		});

		return total;
	}.property('collection.@each.totalEnabledContentTypes', 'collection.@each.connected'),

	isDisabled: function() {
		return (!this.get('totalEnabledContentTypes') || this.get('isSubmitting'));
	}.property('totalEnabledContentTypes', 'isSubmitting'),

	saveLabel: function() {
		if (this.get('isSubmitting')) {
			return 'Loading...';
		} else {
			return 'Start Backing Them Up';
		}
	}.property('isSubmitting')
});

App.Source = Ember.Object.extend({
	ID: 			null,	// string
	name: 			null,	// string
	contentTypes: 	[],	// array
	connected: 		false,	// boolean

	totalEnabledContentTypes: function() {
		console.log('total enabled content types (source)');
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

	isDisabled: function() {
		return (!this.get('source').get('connected'));
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
				this.transitionToRoute('sync');
			} else {
				this.transitionToRoute('sources');
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
			this.transitionToRoute('sources');
		},
		submitSurvey: function() {
			this.get('model').storageSurvey.save();
		}
	}
});

App.SourcesRoute = Ember.Route.extend({
	model: function() { 
		return {
			sources: App.Sources.create({})
		};
	}
});

App.SourcesController = Ember.ObjectController.extend({
	actions: {
		sync: function() {
			this.transitionToRoute('sync');
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
		},
		saveSources: function() {
			this.get('model').sources.save();
			this.transitionToRoute('sync');
		}
	}
});

App.SyncRoute = Ember.Route.extend({
	model: function() { 
		return {
			storages: App.Storages.create({})
		};
	}
});