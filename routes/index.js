App.IndexRoute = Ember.Route.extend({
  model: function() {
    var store = this.store;
    return this.store.find('storageSurvey').then(function(storageSurveys) {
      if (Ember.isEmpty(storageSurveys)) {
        return store.createRecord('storageSurvey');
      } else {
        return storageSurveys.get('firstObject');
      }
    });
  },

	setupController: function(controller, model) {
    controller.set('isConnectingDropbox', false);
		controller.set('model', model);
	},

  actions: {
    connectDropbox: function() {
      var route = this;
      this.controller.set('isConnectingDropbox', true);
      this.controllerFor('session').register().then(function() {
        route.transitionTo('sources')
      });
    }
  },
});