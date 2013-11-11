App.Sources = Ember.Object.extend({
	collection: 	[],

	init: function() {
		this.GET(
			'/sources',
			function(responseJSON) {
				var collection = [];

				$.each(responseJSON, function(key, sourceJSON) {
					var source = App.Source.create({ 
						ID: 				sourceJSON.ID,
						name:   			sourceJSON.name,
						contentTypes: 		[],
						connected: 			sourceJSON.connected
					});

					var contentTypes = [];

					$.each(sourceJSON.contentTypes, function(key, contentTypeJSON) {
						contentTypes.push(
							App.ContentType.create({
								ID: 			contentTypeJSON.ID,
								name: 			contentTypeJSON.name,
								namePlural: 	contentTypeJSON.namePlural,
								enabled: 		contentTypeJSON.enabled,
								source: 		source
							})
						);
					});

					source.set('contentTypes', contentTypes);
					collection.push(source);
				});

				target.set('collection', collection);
			}
		);
	},

	data: function() {
		return {
			// ?
		};
	}.property(),

	save: function() {
		this.POST(
			'/sources', 
			this.get('data'),
			null, // ?
			null // ?
		);
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
		console.log('total enabled content types (sources)');
		var total = 0;

		$.each(this.get('collection'), function(key, source) {
			if (this.get('connected')) {
				total += source.get('totalEnabledContentTypes');
			}
		});

		return total;
	}.property('collection.@each.totalEnabledContentTypes', 'collection.@each.connected'),

	isDisabled: function() {
		return (!this.get('totalEnabledContentTypes') || this.get('isSubmitting'));
	}.property('totalEnabledContentTypes', 'isSubmitting'),

	saveLabel: function() {
		if (this.get('isSubmitting')) {
			return 'Loading...';
		} else {
			return 'Start Backing Them Up';
		}
	}.property('isSubmitting')
});