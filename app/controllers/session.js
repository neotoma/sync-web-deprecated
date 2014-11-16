App.SessionController = Ember.Controller.extend({
  user: Ember.computed.alias('model.users.firstObject'),

  populate: function() {
    var controller = this;

    return this.store.find('session').then(function(sessions) {
      controller.set('model', sessions.get('firstObject'));
    });
  },

  deauthenticate: function() {
    this.get('model').destroyRecord();
    this.set('model', null);
  }
});

Ember.Application.initializer({
  name: 'session',

  initialize: function(container) {
    App.deferReadiness();
    container.lookup('controller:session').populate().then(function() {
      App.advanceReadiness();
    });
  }
});