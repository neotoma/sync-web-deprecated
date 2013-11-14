App.Sources = Ember.Object.extend({
	toJSON: function() {
		return {
			// ?
		};
	},

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
			if (this.get('connected')) {
				total += source.get('totalEnabledContentTypes');
			}
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
				for(var i = 0; i < sources.length; i++) {
					collection[i] = App.Source.create(collection[i]);
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