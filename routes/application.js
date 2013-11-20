App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return App.User.get();
  },

  actions: {
    goToHome: function() {
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