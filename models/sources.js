App.Sources = Ember.Object.extend({
	toJSON: function() {
		return {
			// ?
		};
	}.property(),

	totalConnectedSources: function() {
		var total = 0;

		$.each(this.get('collection'), function(key, source) {
			if (source.connected) {
				total++;
			}
		});

		return total;
	}.property('collection.@each.connected'),

	hasConnectedSources: function() {
		return (this.get('totalConnectedSources') > 0);
	}.property('totalConnectedSources'),

	totalEnabledContentTypes: function() {
    var total = 0;

		$.each(this.get('collection'), function(key, source) {
			total += source.get('totalEnabledContentTypes');
		});

		return total;
	}.property('collection.@each.totalEnabledContentTypes')
});

App.Sources.reopenClass({
	get: function() {
		return $.ajax({ 
			url: '/sources', 
			dataType: 'json' 
		}).then(
      function(response) {
      	var sources = App.Sources.create();

				// Init App.Source objects from basic objects
				var collection = response;
				for(var i = 0; i < collection.length; i++) {
					var source = App.Source.create(collection[i]);
					
					// Init App.ContentType objects from basic objects
					var contentTypes = [];
					$.each(collection[i].contentTypes, function(key, contentTypeJSON) {
						contentTypeJSON.source = source;
						contentTypes.push(App.ContentType.create(contentTypeJSON));
					});
					source.set('contentTypes', contentTypes);

					collection[i] = source;
				}
				sources.set('collection', collection);

        return sources;
      }
    );
	},
	
	post: function(sources, doneFilter, failFilter) {
		return $.ajax({ 
			url: '/sources', 
			dataType: 'json', 
			type: 'post', 
			data: sources.toJSON 
		}).then(doneFilter, failFilter);
	}
});