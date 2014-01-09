if (APP_CONFIG.SIMULATIONS_ENABLED) {
  App.SyncController.reopen({
    actions: {
      /* Client-Side */

      simulateOccupiedSizeIncrease: function(view) {
        view.get('storage').simulateOccupiedSizeIncrease();
      },
      simulateTotalSizeIncrease: function(view) {
        view.get('storage').simulateTotalSizeIncrease();
      },
      simulateOtherSizeIncrease: function(view) {
        view.get('storage').simulateOtherSizeIncrease();
      },
      simulateOccupiedSizeDecrease: function(view) {
        view.get('storage').simulateOccupiedSizeDecrease();
      },
      simulateTotalSizeDecrease: function(view) {
        view.get('storage').simulateTotalSizeDecrease();
      },
      simulateOtherSizeDecrease: function(view) {
        view.get('storage').simulateOtherSizeDecrease();
      },
      simulateContentTypeIncrease: function(view) {
        view.get('contentType').simulateIncrease();
      },
      simulateContentTypeDecrease: function(view) {
        view.get('contentType').simulateDecrease();
      },

      /* Server-Side */

      simulateServerUserUpdate: function() {
        for (var i = 0; i < App.ContentType.FIXTURES.length; i++) {
          App.ContentType.FIXTURES[i]['totalItemsAvailable'] = 100;
          App.ContentType.FIXTURES[i]['totalItemsSynced'] = App.ContentType.FIXTURES[i]['totalItemsSynced'] + 10;
        }
        console.log('simulateServerUserUpdate completed');
      }
    }
  });
}