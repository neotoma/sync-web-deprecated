App.SyncController = Ember.ObjectController.extend({
  needs: 'session',

  refreshSources: function() {
    this.get('controllers.session').get('user.sources').forEach(function(source) {
      source.get('contentTypes').forEach(function(contentType) {
        contentType.reload();
      });
    });
  },

  refreshStorages: function() {
    this.get('controllers.session').get('user.storages').forEach(function(storage) {
      storage.reload();
    });
  }
});