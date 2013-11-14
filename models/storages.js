App.Storages = Ember.Object.extend({
	resource: '/storages',

	init: function() {
		this.GET(
			this.get('resource'),
			function(responseStorages) {
				var storages = [];

				$.each(responseStorages, function(key, responseStorage) {
					storages.push(App.Storage.create(responseStorage));
				});

				target.set('storages', storages);
			}
		);
	}
});