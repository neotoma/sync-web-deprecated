App.User = Ember.Object.extend({
	hasConnectedStorage: function() {
		return (this.get('storages') && this.get('storages').length);
	}.property('storages.@each'),

	hasConnectedSources: function() {
		return (this.get('sources') && this.get('sources').length);
	}.property('sources.@each')
});

App.User.reopenClass({
	get: function() {
		return $.ajax({ 
			url: '/user', 
			dataType: 'json' 
		}).then(
      function(response) {
      	var user = App.User.create();

      	// Incorporate all returned values
				for (var key in response) {
					user.set(key, responseUser[key]);
				}
				
				// Init App.Storage objects from basic objects
				var storages = response.storages;
				for(var i = 0; i < storages.length; i++) {
					storages[i] = App.Storage.create(storages[i]);
				}

				user.set('storages', storages);

				// Init App.Source objects from basic objects
				var sources = response.sources;
				for(var i = 0; i < sources.length; i++) {
					sources[i] = App.Source.create(sources[i]);
				}
				user.set('sources', sources);

        return user;
      },
      function(reason) {
      	console.log('user get failed: ' + reason);
      }
    );
	}
});