App.Source = Ember.Object.extend({
	totalEnabledContentTypes: function() {
    var total = 0;

		$.each(this.get('contentTypes'), function(key, contentType) {
			if (contentType.enabled) {
				total++;
			}
		});

		return total;
	}.property('contentTypes.@each.enabled')
});