App.SessionController = Ember.Controller.extend({
  model: null,

  populate: function() {
    var controller = this;

    return this.store.find('session').then(function(sessions) {
      controller.set('model', sessions.get('firstObject'));
    });
  },

  authenticate: function() {
    var URL = APP_CONFIG.DATA.HOST + '/storages/dropbox/auth?redirectURL=' + encodeURIComponent(window.location.href);
    window.location.href = URL;
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