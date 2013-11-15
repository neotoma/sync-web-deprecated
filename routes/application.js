App.ApplicationRoute = Ember.Route.extend({
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
  }
});