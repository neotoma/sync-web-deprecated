App.SyncRoute = Ember.Route.extend({
  beforeModel: function() {
    var sessionUser = this.modelFor('application');

    if (!sessionUser) {
      this.transitionTo('index');
    } else {
      var route = this;

      return sessionUser.get('sources').then(function() {
        if(!sessionUser.get('hasSource')) {
          route.transitionTo('sources');
        }
      });
    }
  },

  model: function() {
    return this.modelFor('application');
  },
});