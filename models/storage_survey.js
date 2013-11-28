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

if (APP_CONFIG.DATA.FIXTURES_ENABLED.STORAGE_SURVEYS) {
  App.StorageSurvey.FIXTURES = [
    {
      id:         'fixture-1',
      email:      'example@example.com',
      preference: 'Amazon S3'
    }
  ];
} else {
  App.StorageSurvey.FIXTURES = [];
}