App = Ember.Application.create();

App.StorageSurvey = Ember.Object.extend({
	email: null,
	preference: null,
	saved: false,
	validation: {
		email: {
			pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}',
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

		$.get("http://dashboard.asheville.io/storage-survey").then(
			function(response) {
				this.set('email', response['email']);
				this.set('preference', response['preference']);
				console.log('initialized storage survey');

				if (response.email && response.preference) {
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

		console.log('saving storage survey');
		console.log(data);

		$.post("http://dashboard.asheville.io/storage-survey", data).then(
			function(response) {
				console.log('saved storage survey');
			}, 
			function(error) {
				console.log('failed to save storage survey');
			}
		);
	}
});

Ember.TextField.reopen({
	attributeBindings: ['spellcheck', 'autocomplete', 'pattern', 'required'],
	change: function(event) {
		console.log('!');
	}
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