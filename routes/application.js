App.ApplicationRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    var promise = this.store.find('user').then(function(users) {
      controller.set('sessionUser', users.get('firstObject'));
    });

    return promise
  },

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
      this.controller.authenticateUser();
    },

    signOut: function() {
      this.controller.deauthenticateUser();
      this.transitionTo('index');
    }
  }
});