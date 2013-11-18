App.SimulatedServer = Ember.Object.extend({
	init: function() {
		if (!this.get('presets').storageSurvey) {
			this.set('storageSurvey', Ember.Object.create({}));
		} else {
			this.set('storageSurvey', Ember.Object.create({
				email: 			'example@example.com',
				preference: 	'Amazon S3'
			}));
		}

		if (!this.get('presets').user) {
			this.set('user', Ember.Object.create({
				ID: 		null,
				email: 		null
			}));
		} else {
			this.set('user', Ember.Object.create({
				ID: 		1,
				email: 		'example@example.org'
			}));
		}

		if (!this.get('presets').storages) {
			this.get('user').set('storages', []);

			this.set('storages', [
				{
					ID: 'dropbox',
					name: 'Dropbox',
					connected: false
				}
			]);
		} else {
			this.get('user').set('storages', [
				{
					ID: 'dropbox',
					name: 'Dropbox',
					sizes: {
						total: 5000000000, // 5 GB
						available: 2000000000, // 2 GB
						occupied: 1250000000, // 1.25 GB
						other: 1750000000 // 1.75 GB
					},
					timestamps: {
						lastCompletedSync: null
					}
				}
			]);

			this.set('storages', [
				{
					ID: 'dropbox',
					name: 'Dropbox',
					connected: true
				}
			]);
		}

		if (!this.get('presets').sources) {
			this.get('user').set('sources', []);

			this.set('sources', [
				{ 
					ID: 	'facebook',
					name:   'Facebook',
					totalItemsSynced: null,
					totalItemsAvailable: null,
					timestamps: {
						lastCompletedSync: null,
					},
					contentTypes: [
						{
							ID: 			'status-update',
							name: 			'Status Update',
							enabled: 		false
						},
						{
							ID: 			'link',
							name: 			'Link',
							enabled: 		false
						},
						{
							ID: 			'checkin',
							name: 			'Check-in',
							enabled: 		false
						},
						{
							ID: 			'photo',
							name: 			'Photo',
							enabled: 		false
						},
						{
							ID: 			'video',
							name: 			'Video',
							enabled: 		false
						}
					],
					connected: false
				},
				{ 
					ID: 	'twitter',
					name:   'Twitter',
					totalItemsSynced: null,
					totalItemsAvailable: null,
					timestamps: {
						lastCompletedSync: null,
					},
					contentTypes: [
						{
							ID: 			'tweet',
							name: 			'Tweet',
							enabled: 		false
						},
						{
							ID: 			'favorite',
							name: 			'Favorite',
							enabled: 		false
						},
						{
							ID: 			'retweet',
							name: 			'Retweet',
							enabled: 		false
						},
						{
							ID: 			'direct-message',
							name: 			'Direct Message',
							enabled: 		false
						}
					],
					connected: false
				},
				{ 
					ID: 	'instagram',
					name:   'Instagram',
					totalItemsSynced: null,
					totalItemsAvailable: null,
					timestamps: {
						lastCompletedSync: null,
					},
					contentTypes: [
						{
							ID: 			'photo',
							name: 			'Photo',
							enabled: 		false
						},
						{
							ID: 			'video',
							name: 			'Video',
							enabled: 		false
						},
						{
							ID: 			'like',
							name: 			'Like',
							enabled: 		false
						}
					],
					connected: false
				},
				{ 
					ID: 	'foursquare',
					name:   'Foursquare',
					totalItemsSynced: null,
					totalItemsAvailable: null,
					timestamps: {
						lastCompletedSync: null,
					},
					contentTypes: [
						{
							ID: 			'checkin',
							name: 			'Check-in',
							enabled: 		false
						},
						{
							ID: 			'tip',
							name: 			'Tip',
							enabled: 		false
						},
						{
							ID: 			'like',
							name: 			'Like',
							enabled: 		false
						}
					],
					connected: false
				}
			]);
		} else {
			this.get('user').set('sources', [
				{ 
					ID: 	'facebook',
					name:   'Facebook',
					timestamps: {
						lastCompletedSync: null,
					},
					contentTypes: [
						{
							ID: 			'status-update',
							name: 			'Status Update',
							totalItemsAvailable: 2010,
							totalItemsSynced: 2010
						},
						{
							ID: 			'link',
							name: 			'Link',
							totalItemsAvailable: 5000,
							totalItemsSynced: 1530
						},
						{
							ID: 			'checkin',
							name: 			'Check-in',
							totalItemsAvailable: 7010,
							totalItemsSynced: 0
						}
					]
				},
				{ 
					ID: 	'twitter',
					name:   'Twitter',
					timestamps: {
						lastCompletedSync: null,
					},
					contentTypes: [
						{
							ID: 			'tweet',
							name: 			'Tweet',
							totalItemsAvailable: 1823,
							totalItemsSynced: 1010
						},
						{
							ID: 			'retweet',
							name: 			'Retweet',
							totalItemsAvailable: 301,
							totalItemsSynced: 0
						},
						{
							ID: 			'direct-message',
							name: 			'Direct Message',
							totalItemsAvailable: 150,
							totalItemsSynced: 0
						}
					]
				}
			]);

			this.set('sources', [
				{ 
					ID: 	'facebook',
					name:   'Facebook',
					contentTypes: [
						{
							ID: 			'status-update',
							name: 			'Status Update',
							enabled: 		true
						},
						{
							ID: 			'link',
							name: 			'Link',
							enabled: 		true
						},
						{
							ID: 			'checkin',
							name: 			'Check-in',
							enabled: 		true
						},
						{
							ID: 			'photo',
							name: 			'Photo',
							enabled: 		false
						},
						{
							ID: 			'video',
							name: 			'Video',
							enabled: 		false
						}
					],
					connected: true
				},
				{ 
					ID: 	'twitter',
					name:   'Twitter',
					contentTypes: [
						{
							ID: 			'tweet',
							name: 			'Tweet',
							enabled: 		true
						},
						{
							ID: 			'favorite',
							name: 			'Favorite',
							enabled: 		false
						},
						{
							ID: 			'retweet',
							name: 			'Retweet',
							enabled: 		true
						},
						{
							ID: 			'direct-message',
							name: 			'Direct Message',
							enabled: 		true
						}
					],
					connected: true
				},
				{ 
					ID: 	'instagram',
					name:   'Instagram',
					contentTypes: [
						{
							ID: 			'photo',
							name: 			'Photo',
							enabled: 		false
						},
						{
							ID: 			'video',
							name: 			'Video',
							enabled: 		false
						},
						{
							ID: 			'like',
							name: 			'Like',
							enabled: 		false
						}
					],
					connected: false
				},
				{ 
					ID: 	'foursquare',
					name:   'Foursquare',
					contentTypes: [
						{
							ID: 			'checkin',
							name: 			'Check-in',
							enabled: 		false
						},
						{
							ID: 			'tip',
							name: 			'Tip',
							enabled: 		false
						},
						{
							ID: 			'like',
							name: 			'Like',
							enabled: 		false
						}
					],
					connected: false
				}
			]);
		}
	}
});

App.SimulatedServer = App.SimulatedServer.create({
	presets: APP_CONFIGURATION.simulatedServer.presets
});

/* API Requests */

if (APP_CONFIGURATION.simulatedServer.enabled) {

	// GET Storage Survey
	$.mockjax({
		url: '/storage-survey',
		dataType: 'json',
		type: 'get',
		responseTime: APP_CONFIGURATION.simulatedServer.responseTime,
		responseText: App.SimulatedServer.get('storageSurvey')
	});

	// POST Storage Survey
	$.mockjax({
		url: '/storage-survey',
		dataType: 'json',
		type: 'post',
		responseTime: APP_CONFIGURATION.simulatedServer.responseTime,
		responseText: App.SimulatedServer.get('storageSurvey')
	});

	// GET User
	$.mockjax({
		url: '/user',
		dataType: 'json',
		type: 'get',
		responseTime: APP_CONFIGURATION.simulatedServer.responseTime,
		responseText: App.SimulatedServer.get('user')
	});

	// GET Storages
	$.mockjax({
		url: '/storages',
		dataType: 'json',
		type: 'get',
		responseTime: APP_CONFIGURATION.simulatedServer.responseTime,
		responseText: App.SimulatedServer.get('storages')
	});

	// GET Sources
	$.mockjax({
		url: '/sources',
		dataType: 'json',
		type: 'get',
		responseTime: APP_CONFIGURATION.simulatedServer.responseTime,
		responseText: App.SimulatedServer.get('sources')
	});

	// POST Sources
	$.mockjax({
		url: '/sources',
		dataType: 'json',
		type: 'post',
		responseTime: APP_CONFIGURATION.simulatedServer.responseTime,
		responseText: App.SimulatedServer.get('sources')
	});
}