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