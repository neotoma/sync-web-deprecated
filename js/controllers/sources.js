App.SourcesController = Ember.ObjectController.extend({
	actions: {
		sync: function() {
			this.transitionToRoute('sync');
		},
		toggleConnection: function(source) {
			if (source.get('connected')) {
				if (confirm('Are you sure you want to disconnect ' + source.get('name') + '?')) {
					source.set('connected', false);
				}
			} else {
				source.set('connected', true);
			}
		},
		disconnectSource: function(source) {
			source.set('connected', false);
		},
		saveSources: function() {
			this.get('model').sources.save();
			this.transitionToRoute('sync');
		}
	}
});