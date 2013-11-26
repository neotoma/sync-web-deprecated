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
      this.controllerFor('application').authenticateUser();
    },

    signOut: function() {
      this.controllerFor('application').deauthenticateUser();
    }
  }
});