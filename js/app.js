App = Ember.Application.create();

App.Router.map(function() {
	this.route('sources');
	this.route('sync');
});

App.IndexRoute = Ember.Route.extend({
	actions: {
		connectDropbox: function() {
			this.transitionTo('sources');
		}
	}
});

App.SourcesRoute = Ember.Route.extend({
	actions: {
		sync: function() {
			this.transitionTo('sync');
		}
	}
});