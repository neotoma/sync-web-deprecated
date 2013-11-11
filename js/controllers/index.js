App.IndexController = Ember.ObjectController.extend({
	actions: {
		connectDropbox: function() {
			this.transitionToRoute('sources');
		},
		submitSurvey: function() {
			this.get('model').storageSurvey.save();
		}
	}
});