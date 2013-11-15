App.Storage = Ember.Object.extend({
	availablePercentage: function(size) {
		return (this.get('sizes').available / this.get('sizes').total * 100);
	}.property('sizes.available'),

	occupiedPercentage: function(size) {
		return (this.get('sizes').occupied / this.get('sizes').total * 100);
	}.property('sizes.occupied'),

	otherPercentage: function(size) {
		return (this.get('sizes').other / this.get('sizes').total * 100);
	}.property('sizes.other'),

	resource: function() {
		return '/storages/' + this.get('ID');
	}.property('ID'),

	/* Simulations */

	simulationChangeIncrement: 250000000,

	simulateOccupiedSizeIncrease: function() {
		var sizes = this.get('sizes');
		var increase = this.get('simulationChangeIncrement');

		if (sizes.get('occupied') + sizes.get('other') + increase > sizes.get('total')) {
			increase = sizes.get('total') - sizes.get('occupied') - sizes.get('other');
		}

		sizes.set('occupied', sizes.get('occupied') + increase);
		sizes.set('available', sizes.get('available') - increase);
	},

	simulateOccupiedSizeDecrease: function() {
		var sizes = this.get('sizes');
		var decrease = this.get('simulationChangeIncrement');

		if (sizes.get('occupied') - decrease <= 0) {
			decrease = sizes.get('occupied');
		}

		sizes.set('occupied', sizes.get('occupied') - decrease);
		sizes.set('available', sizes.get('available') + decrease);
	},

	simulateTotalSizeIncrease: function() {
		this.get('sizes').set('total', this.get('sizes').get('total') + this.get('simulationChangeIncrement'));
		this.get('sizes').set('available', this.get('sizes').get('available') + this.get('simulationChangeIncrement'));
	},

	simulateTotalSizeDecrease: function() {
		if (this.get('sizes').get('total') - this.get('simulationChangeIncrement') >= this.get('sizes').get('other') + this.get('sizes').get('occupied')) {
			this.get('sizes').set('total', this.get('sizes').get('total') - this.get('simulationChangeIncrement'));
			this.get('sizes').set('available', this.get('sizes').get('available') - this.get('simulationChangeIncrement'));
		}
	},

	simulateOtherSizeIncrease: function() {
		var sizes = this.get('sizes');
		var increase = this.get('simulationChangeIncrement');

		if (sizes.get('occupied') + sizes.get('other') + increase > sizes.get('total')) {
			increase = sizes.get('total') - sizes.get('occupied') - sizes.get('other');
		}

		sizes.set('other', sizes.get('other') + increase);
		sizes.set('available', sizes.get('available') - increase);
	},

	simulateOtherSizeDecrease: function() {
		var sizes = this.get('sizes');
		var decrease = this.get('simulationChangeIncrement');

		if (sizes.get('other') - decrease <= 0) {
			decrease = sizes.get('other');
		}

		sizes.set('other', sizes.get('other') - decrease);
		sizes.set('available', sizes.get('available') + decrease);
	}
});