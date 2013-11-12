App.SyncController = Ember.ObjectController.extend({
	actions: {
		simulateOccupiedSizeIncrease: function(view) {
			view.get('storage').simulateOccupiedSizeIncrease();
		},
		simulateTotalSizeIncrease: function(view) {
			view.get('storage').simulateTotalSizeIncrease();
		},
		simulateOtherSizeIncrease: function(view) {
			view.get('storage').simulateOtherSizeIncrease();
		}
	}
});