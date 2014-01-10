if (APP_CONFIG.SIMULATIONS_ENABLED) {
  App.SyncController.reopen({
    simulateUpdate: function() {
      var lastUpdatedSource;

      for (var i = 0; i < App.ContentType.FIXTURES.length; i++) {
        if (!App.ContentType.FIXTURES[i]['totalItemsAvailable']) {
          App.ContentType.FIXTURES[i]['totalItemsAvailable'] = Math.getRandomInt(10, 5000);
        }

        if (lastUpdatedSource != App.ContentType.FIXTURES[i]['source'] && App.ContentType.FIXTURES[i]['totalItemsSynced'] < App.ContentType.FIXTURES[i]['totalItemsAvailable']) {
          var increment = Math.getRandomInt(1, 100);

          if (App.ContentType.FIXTURES[i]['totalItemsSynced'] + increment > App.ContentType.FIXTURES[i]['totalItemsAvailable']) {
            increment = App.ContentType.FIXTURES[i]['totalItemsAvailable'] - App.ContentType.FIXTURES[i]['totalItemsSynced'];
          }

          App.ContentType.FIXTURES[i]['totalItemsSynced'] = App.ContentType.FIXTURES[i]['totalItemsSynced'] + increment;
          //App.Storage.FIXTURES[0]['occupiedSize'] = App.Storage.FIXTURES[i]['occupiedSize'] + 1000000;
          lastUpdatedSource = App.ContentType.FIXTURES[i]['source'];
        }
      }
    },
    
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
      }
    }
  });
}