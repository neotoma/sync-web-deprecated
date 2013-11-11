App.SourcesRoute = Ember.Route.extend({
	model: function() { 
		return {
			sources: App.Sources.create({})
		};
	}
});