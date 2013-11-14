App.SourcesRoute = Ember.Route.extend({
	model: function() {
    return App.Sources.get();
  }
});