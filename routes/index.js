App.IndexRoute = Ember.Route.extend({
	model: function() {
    var store = this.store;
    var promise = this.store.find('storageSurvey').then(function(storageSurveys) {
      if (Ember.empty(storageSurveys)) {
        return store.createRecord('storageSurvey');
      } else {
        return storageSurveys.get('firstObject');
      }
    });

    return promise;
  },

	setupController: function(controller, model) {
    controller.set('isConnectingDropbox', false);
		controller.set('model', model);
	},

  actions: {
    connectDropbox: function() {
      var route = this;
      this.controller.set('isConnectingDropbox', true);
      this.controllerFor('application').registerUser().then(function() {
        route.transitionTo('sources')
      });
    }
  },
});