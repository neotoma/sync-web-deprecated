App.SyncRoute = Ember.Route.extend({
	model: function() { 
		return App.User.get();
	}
});