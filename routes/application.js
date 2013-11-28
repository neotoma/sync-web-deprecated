App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('user').then(function(users) {
      return users.get('firstObject');
    });
  },

  setupController: function(controller, model) {
    controller.set('sessionUser', model);
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
      var route = this;
      this.controller.authenticateUser().then(function() {
        var sessionUser = route.controller.get('sessionUser');

        if (!sessionUser.get('hasSource')) {
          route.transitionTo('sources');
        } else {
          route.transitionTo('sync');
        }
      });
    },

    signOut: function() {
      this.controller.deauthenticateUser();
      this.transitionTo('index');
    }
  }
});