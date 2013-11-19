App.IndexRoute = Ember.Route.extend({
	model: function() {
		return App.StorageSurvey.get();
	},

	setupController: function(controller, model) {
		if (model.get('email') && model.get('preference')) {
			model.set('isSubmitted', true);
		}

    controller.set('isConnectingDropbox', false);
		controller.set('model', model);
	},

  actions: {
    connectDropbox: function() {
      this.controller.set('isConnectingDropbox', true);
      this.transitionTo('sources');
    }
  },
});