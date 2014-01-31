if (APP_CONFIG.SIMULATIONS_ENABLED) {
  App.SyncController.reopen({
    simulateUpdate: function() {
      var lastUpdatedSource;
      var totalSyncingSources = 0;

      for (var i = 0; i < App.ContentType.FIXTURES.length; i++) {
        if (!App.ContentType.FIXTURES[i]['totalItemsAvailable']) {
          App.ContentType.FIXTURES[i]['totalItemsAvailable'] = Math.getRandomInt(10, 5000);
        }

        if (lastUpdatedSource != App.ContentType.FIXTURES[i]['source'] && App.ContentType.FIXTURES[i]['totalItemsSynced'] < App.ContentType.FIXTURES[i]['totalItemsAvailable']) {
          totalSyncingSources = totalSyncingSources + 1;

          // Update content type
          var contentTypeIncrement = Math.getRandomInt(1, 100);

          if (App.ContentType.FIXTURES[i]['totalItemsSynced'] + contentTypeIncrement > App.ContentType.FIXTURES[i]['totalItemsAvailable']) {
            contentTypeIncrement = App.ContentType.FIXTURES[i]['totalItemsAvailable'] - App.ContentType.FIXTURES[i]['totalItemsSynced'];
          }

          App.ContentType.FIXTURES[i]['totalItemsSynced'] = App.ContentType.FIXTURES[i]['totalItemsSynced'] + contentTypeIncrement;
          
          if (contentTypeIncrement > 0) {
            App.ContentType.FIXTURES[i]['isSyncing'] = true;
          }

          lastUpdatedSource = App.ContentType.FIXTURES[i]['source'];

          // Update storage
          var storageIncrement = Math.getRandomInt(1000, 1000000);
          
          if (App.Storage.FIXTURES[0]['occupiedSize'] + storageIncrement > App.Storage.FIXTURES[0]['totalSize']) {
            storageIncrement = App.Storage.FIXTURES[0]['totalSize'] - App.Storage.FIXTURES[0]['occupiedSize'];
          }

          App.Storage.FIXTURES[0]['occupiedSize'] = App.Storage.FIXTURES[0]['occupiedSize'] + storageIncrement;

           if (storageIncrement > 0) {
            App.Storage.FIXTURES[0]['isSyncing'] = true;
          } else {
            App.Storage.FIXTURES[0]['isSyncing'] = false;
          }
        } else {
          App.ContentType.FIXTURES[i]['isSyncing'] = false;
        }
      }

      // Determine storage syncing status
      if (totalSyncingSources > 0) {
        App.Storage.FIXTURES[0]['isSyncing'] = true;
      } else {
        App.Storage.FIXTURES[0]['isSyncing'] = false;
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