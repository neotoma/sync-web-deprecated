App.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    if (this.controllerFor('index').get('sessionUser.hasUserStorageAuth')) {
      this.transitionTo('sources');
    }
  },
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
  afterModel: function(model, transition) {
    var controller = this.controllerFor('index');
    transition.then(function() {
      controller.startAnimation();
    });
  }
});