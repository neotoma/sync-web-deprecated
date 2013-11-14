App.Source = Ember.Object.extend({
	init: function() {
		var contentTypes = [];

		$.each(this.get('contentTypes'), function(key, contentTypeJSON) {
			contentTypeJSON.source = this;
			contentTypes.push(App.ContentType.create(contentTypeJSON));
		});

		this.set('contentTypes', contentTypes);
	},

	totalEnabledContentTypes: function() {
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