App.SessionController = Ember.Controller.extend({
  session: null,

  populate: function() {
    var controller = this;

    return this.store.find('session').then(function(sessions) {
      controller.set('session', sessions.get('firstObject'));
    });
  },

  authenticate: function() {
    var URL = APP_CONFIG.DATA.HOST + '/storages/dropbox/auth?redirectURL=' + encodeURIComponent(window.location.href);
    window.location.href = URL;
  },

  deauthenticate: function() {
    this.get('session').destroyRecord();
    this.set('session', null);
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