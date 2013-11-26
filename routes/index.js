App.IndexRoute = Ember.Route.extend({
	model: function() {
    var promise = Ember.Deferred.create();
    var store = this.store;

    this.store.find('storageSurvey').then(function(results) {
      if (Ember.empty(results)) {
        var storage_survey = store.createRecord('storageSurvey');
        promise.resolve(storage_survey);
      } else {
        promise.resolve(results.objectAt(0));
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
      this.controllerFor('application').authenticateUser();
      this.controller.set('isConnectingDropbox', true);
      this.transitionTo('sources');
    }
  },
});