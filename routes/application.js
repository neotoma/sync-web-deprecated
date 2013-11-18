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
      console.log('App.ApplicationRoute.actions.signIn');
    },

    signOut: function() {
      console.log('App.ApplicationRoute.actions.signOut');
    }
  }
});