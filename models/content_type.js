App.ContentType = Ember.Object.extend({
	comboID: function() {
		return this.get('source').get('ID') + '-' + this.get('ID');
	}.property('source', 'ID'),

	isDisabled: function() {
		return (!this.get('source').get('connected'));
	}.property('source.connected')
});