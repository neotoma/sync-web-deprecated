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

  actions: {
    toggleDropbox: function() {
      if (!this.controllerFor('session').get('user.hasStorage')) {
        var route = this;
        this.controllerFor('session').authenticate().then(function() {
          route.transitionTo('sources')
        });
      } else {
        if(confirm("Are you sure you want to disconnect Dropbox?\n\nNone of the content you've already backed up will be affected in the process, but all of your Asheville settings (such as connections to social networks and their respective content types) will be deleted permanently.")) {
          return this.controllerFor('session').deleteUser();
        }
      }
    }
  },
});