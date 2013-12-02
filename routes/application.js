App.ApplicationRoute = Ember.Route.extend({
  actions: {
    goToIndex: function() {
      this.transitionTo('index');
    },

    goToSources: function() {
      this.transitionTo('sources');
    },

    goToSync: function() {
      this.transitionTo('sync');
    },

    signIn: function() {
      var route = this;
      this.controllerFor('session').authenticate().then(function(user) {
        if (!user.get('hasSource')) {
          route.transitionTo('sources');
        } else {
          route.transitionTo('sync');
        }
      });
    },

    signOut: function() {
      this.controllerFor('session').deauthenticate();
      this.transitionTo('index');
    }
  }
});