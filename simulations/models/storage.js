if (APP_CONFIG.SIMULATIONS_ENABLED) {
  App.Storage.reopen({
    simulationChangeIncrement: 250000000,

    simulateOccupiedSizeIncrease: function() {
      var increase = this.get('simulationChangeIncrement');

      if (this.get('occupiedSize') + this.get('otherSize') + increase > this.get('totalSize')) {
        increase = this.get('totalSize') - this.get('occupiedSize') - this.get('otherSize');
      }

      this.set('occupiedSize', this.get('occupiedSize') + increase);
      this.set('availableSize', this.get('availableSize') - increase);
    },

    simulateOccupiedSizeDecrease: function() {
      var decrease = this.get('simulationChangeIncrement');

      if (this.get('occupiedSize') - decrease <= 0) {
        decrease = this.get('occupiedSize');
      }

      this.set('occupiedSize', this.get('occupiedSize') - decrease);
      this.set('availableSize', this.get('availableSize') + decrease);
    },

    simulateTotalSizeIncrease: function() {
      this.set('totalSize', this.get('totalSize') + this.get('simulationChangeIncrement'));
      this.set('availableSize', this.get('availableSize') + this.get('simulationChangeIncrement'));
    },

    simulateTotalSizeDecrease: function() {
      if (this.get('totalSize') - this.get('simulationChangeIncrement') >= this.get('otherSize') + this.get('occupiedSize')) {
        this.set('totalSize', this.get('totalSize') - this.get('simulationChangeIncrement'));
        this.set('availableSize', this.get('availableSize') - this.get('simulationChangeIncrement'));
      }
    },

    simulateOtherSizeIncrease: function() {
      var increase = this.get('simulationChangeIncrement');

      if (this.get('occupiedSize') + this.get('otherSize') + increase > this.get('totalSize')) {
        increase = this.get('totalSize') - this.get('occupiedSize') - this.get('otherSize');
      }

      this.set('otherSize', this.get('otherSize') + increase);
      this.set('availableSize', this.get('availableSize') - increase);
    },

    simulateOtherSizeDecrease: function() {
      var decrease = this.get('simulationChangeIncrement');

      if (this.get('otherSize') - decrease <= 0) {
        decrease = this.get('otherSize');
      }

      this.set('otherSize', this.get('otherSize') - decrease);
      this.set('availableSize', this.get('availableSize') + decrease);
    }
  });
}