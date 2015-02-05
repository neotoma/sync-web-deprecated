App.SessionController = Ember.Controller.extend({
  user: Ember.computed.alias('model.users.firstObject'),

  populate: function() {
    var sessionController = this;

    return this.store.find('session').then(function(sessions) {
      sessionController.set('model', sessions.get('firstObject'));
    });
  },

  authenticate: function() {
    window.location.href = this.store.adapterFor('application').get('host') + '/storages/dropbox/auth?redirectURL=' + encodeURIComponent(window.location.href);
  },

  deauthenticate: function() {
    this.get('model').destroyRecord();
    this.set('model', null);
  }
});