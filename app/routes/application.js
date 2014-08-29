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
      this.controllerFor('session').authenticate();
    },

    signOut: function() {
      this.controllerFor('session').deauthenticate();
      this.transitionTo('index');
    }
  }
});