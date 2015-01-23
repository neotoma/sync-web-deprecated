App.ApplicationRoute = Ember.Route.extend({
  needs: ['session'],

  actions: {
    authenticate: function() {
      this.controllerFor('session').authenticate();
    },

    deauthenticate: function() {
      this.controllerFor('session').deauthenticate();
      this.transitionTo('index');
    }
  }
});