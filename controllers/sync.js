App.SyncController = Ember.ObjectController.extend({
  needs: 'session',

  refreshSources: function() {
    console.log('Refreshing...');

    var sessionUser = this.get('controllers.session').get('user');

    //sessionUser.reload();
    sessionUser.get('sources').forEach(function(source) {
      source.get('contentTypes').forEach(function(contentType) {
        contentType.reload();
      });
    });

    console.log('Refreshed!');
  }
});