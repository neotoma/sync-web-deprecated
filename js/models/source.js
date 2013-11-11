App.Source = Ember.Object.extend({
	ID: 			null,	// string
	name: 			null,	// string
	contentTypes: 	[],	// array
	connected: 		false,	// boolean

	totalEnabledContentTypes: function() {
		console.log('total enabled content types (source)');
		var total = 0;

		$.each(this.get('contentTypes'), function(key, contentType) {
			if (contentType.enabled) {
				total++;
			}
		});

		return total;
	}.property('contentTypes.@each.enabled'),

	connectLabel: function() {
		if (this.get('connected')) {
			return '&#10003; Connected';
		} else {
			return 'Connected';
		}
	}.property('connected')
});