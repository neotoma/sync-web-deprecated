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
  }
});