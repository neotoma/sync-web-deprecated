App.Storage = Ember.Object.extend({
	init: function() {
		var sizes = Ember.Object.create(this.get('sizes'));
		this.set('sizes', sizes);
	},

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

	simulateOccupiedSizeIncrease: function() {
		var sizes = this.get('sizes');
		var increase = 250000000;

		if (sizes.get('occupied') + sizes.get('other') + increase > sizes.get('total')) {
			increase = sizes.get('total') - sizes.get('occupied') - sizes.get('other');
		}

		sizes.set('occupied', sizes.get('occupied') + increase);
		sizes.set('available', sizes.get('available') - increase);
	},

	simulateTotalSizeIncrease: function() {
		this.get('sizes').set('total', this.get('sizes').get('total') + 250000000);
		this.get('sizes').set('available', this.get('sizes').get('available') + 250000000);
	},

	simulateOtherSizeIncrease: function() {
		var sizes = this.get('sizes');
		var increase = 250000000;

		if (sizes.get('occupied') + sizes.get('other') + increase > sizes.get('total')) {
			increase = sizes.get('total') - sizes.get('occupied') - sizes.get('other');
		}

		sizes.set('other', sizes.get('other') + increase);
		sizes.set('available', sizes.get('available') - increase);
	}
});