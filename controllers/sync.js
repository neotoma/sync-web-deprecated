App.SyncController = Ember.ObjectController.extend({
	actions: {
		pauseAllSources: function() {
			console.log('controller.pauseAllSources called');
		},

		/* Simulation Methods */

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
		}
	}
});