App.User = Ember.Object.extend({
  isAuthenticated: function() {
    return this.get('ID');
  }.property('ID'),

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
					user.set(key, response[key]);
				}
				
				// Init App.Storage objects from basic objects
				var storages = response.storages;

        if (storages) {
  				for(var i = 0; i < storages.length; i++) {
            var storage = App.Storage.create(storages[i]);
            storage.set('sizes', Ember.Object.create(storages[i].sizes));
            storage.set('timestamps', Ember.Object.create(storages[i].timestamps));
  					storages[i] = storage;
  				}
        }

				user.set('storages', storages);

				// Init App.Source objects from basic objects
				var sources = response.sources;

        if (sources) {
  				for(var i = 0; i < sources.length; i++) {
  					sources[i] = App.Source.create(sources[i]);

            // Init App.ContentType objects from basic objects
            var contentTypes = [];
            $.each(sources[i].contentTypes, function(key, contentTypeJSON) {
              contentTypeJSON.source = sources[i];
              contentTypes.push(App.ContentType.create(contentTypeJSON));
            });
            sources[i].set('contentTypes', contentTypes);
  				}
        }

				user.set('sources', sources);

        return user;
      }
    );
	}
});