if (APP_CONFIG.SIMULATIONS_ENABLED) {
  App.ContentType.reopen({
    simulationChangeIncrement: 10,

    simulateIncrease: function() {
      var increase = this.get('simulationChangeIncrement');

      if (!this.get('totalItemsSynced')) {
        this.set('totalItemsSynced', 0);
      }

      if (this.get('totalItemsSynced') + increase > this.get('totalItemsAvailable')) {
        increase = this.get('totalItemsAvailable') - this.get('totalItemsSynced');
      }

      this.set('totalItemsSynced', this.get('totalItemsSynced') + increase);
    },

    simulateDecrease: function() {
      var decrease = this.get('simulationChangeIncrement');

      if (this.get('totalItemsSynced') - decrease <= 0) {
        decrease = this.get('totalItemsSynced');
      }

      this.set('totalItemsSynced', this.get('totalItemsSynced') - decrease);
    }
  });
}