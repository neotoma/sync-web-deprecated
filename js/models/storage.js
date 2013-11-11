App.Storage = Ember.Object.extend({
	ID: 	null,
	name: 	null,
	sizes: {
		total:      null,
		available: 	null,
		occupied: 	null,
		other: 		null
	},
	timestamps: {
		lastCompletedSync: null
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
});