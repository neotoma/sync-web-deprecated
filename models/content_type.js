App.ContentType = Ember.Object.extend({
	ID: 					null,	// string		
	name: 				null, 	// string
	namePlural: 	null,	// string
	enabled: 			false,	// boolean
	source: 			null,	// App.Source

	comboID: function() {
		return this.get('source').get('ID') + '-' + this.get('ID');
	}.property('source', 'ID'),

	isDisabled: function() {
		return (!this.get('source').get('connected'));
	}.property('source.connected')
});