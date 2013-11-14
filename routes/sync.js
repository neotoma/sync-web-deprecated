App.SyncRoute = Ember.Route.extend({
	model: function() { 
		return {
			storages: App.Storages.create(),
			sources: App.Sources.create()
		};
	}
});