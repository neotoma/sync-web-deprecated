App.SourcesController = Ember.ArrayController.extend({
  needs: 'session',
  sessionUser: Ember.computed.alias('controllers.session.user'),

  isDisabled: function() {
    return !this.get('sessionUser.hasUserSourceAuth');
  }.property('sessionUser.hasUserSourceAuth'),

  totalContentTypes: function() {
    var userSourceIds = this.get('sessionUser.userSourceAuths').map(function(userSourceAuth) { return userSourceAuth.get('source.id'); });

    var totalContentTypes = 0;

    this.get('model').forEach(function(source) {
      if (userSourceIds.indexOf(source.id) != -1) {
        totalContentTypes = source.get('contentTypes.length');
      }
    });

    return totalContentTypes;
  }.property('sessionUser.userSourceAuths'),

  actions: {
    proceed: function() {
      //$.post(APP_CONFIG.DATA.HOST + '/sources/sync');
      this.transitionToRoute('sync');
    }
  }
});