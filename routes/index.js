App.IndexRoute = Ember.Route.extend({
	model: function() {
		return App.StorageSurvey.get();
	},

	setupController: function(controller, model) {
		if (model.get('email') && model.get('preference')) {
			controller.set('isSubmitted', true);
		}
    
		controller.set('model', model);
	}
});