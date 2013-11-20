App.StorageSurvey = Ember.Object.extend({
	validation: {
		email: {
			pattern: 		'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}',
			required: 	true
		},
		preference: {
			pattern: 		'.{3,}',
			required: 	true
		}
	},

	toJSON: function() {
		return {
			email: 				this.get('email'),
			preference: 	this.get('preference')
		};
	}.property('email', 'preference')
});

App.StorageSurvey.reopenClass({
	get: function() {
		return $.ajax({ 
			url: '/storage-survey', 
			dataType: 'json' 
		}).then(
      function(response) {
        return App.StorageSurvey.create(response);
      },
      function(reason) {
      	console.log('storage survey get failed: ' + reason);
      }
    );
	},
	post: function(storageSurvey, doneFilter, failFilter) {
		App.SimulatedServer.set('storageSurvey', storageSurvey);
		
		return $.ajax({ 
			url: '/storage-survey', 
			dataType: 'json', 
			type: 'post', 
			data: storageSurvey.toJSON 
		}).then(doneFilter, failFilter);
	},
});