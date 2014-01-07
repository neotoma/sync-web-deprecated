App.SyncController = Ember.ObjectController.extend({
  actions: {
    simulateUserUpdate: function() {
      for (var i = 0; i < App.ContentType.FIXTURES.length; i++) {
        App.ContentType.FIXTURES[i]['totalItemsAvailable'] = 100;
        App.ContentType.FIXTURES[i]['totalItemsSynced'] = App.ContentType.FIXTURES[i]['totalItemsSynced'] + 10;
      }
    }
  }
});