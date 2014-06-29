App.StorageSurvey = DS.Model.extend({
	email:   			DS.attr('string'),
	preference: 	DS.attr('string'),

	isSubmitted: function() {
		if (this.get('id'));
	}.property('id'),

	validation: {
		email: {
			pattern: 		'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}',
			required: 	true
		},
		preference: {
			pattern: 		'.{3,}',
			required: 	true
		}
	}
});