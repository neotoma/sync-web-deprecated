App.Storages = Ember.Object.extend({
	resource: 		'/storages',
	collection: 	[],

	init: function() {
		this.GET(
			this.get('resource'),
			function(responseJSON) {
				var collection = [];

				$.each(responseJSON, function(key, storageJSON) {
					collection.push(App.Storage.create(storageJSON));
				});

				target.set('collection', collection);
			}
		);
	}
});