/* Simulated Server Model */

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
							namePlural: 	'Status Updates',
							enabled: 		false
						},
						{
							ID: 			'link',
							name: 			'Link',
							namePlural: 	'Links',
							enabled: 		false
						},
						{
							ID: 			'checkin',
							name: 			'Check-in',
							namePlural: 	'Check-ins',
							enabled: 		false
						},
						{
							ID: 			'photo',
							name: 			'Photo',
							namePlural: 	'Photos',
							enabled: 		false
						},
						{
							ID: 			'video',
							name: 			'Video',
							namePlural: 	'Videos',
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
							namePlural: 	'Tweets',
							enabled: 		false
						},
						{
							ID: 			'favorites',
							name: 			'Favorite',
							namePlural: 	'Favorites',
							enabled: 		false
						},
						{
							ID: 			'retweet',
							name: 			'Retweet',
							namePlural: 	'Retweets',
							enabled: 		false
						},
						{
							ID: 			'direct-messages',
							name: 			'Direct Message',
							namePlural: 	'Direct Messages',
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
							namePlural: 	'Photos',
							enabled: 		false
						},
						{
							ID: 			'video',
							name: 			'Video',
							namePlural: 	'Videos',
							enabled: 		false
						},
						{
							ID: 			'like',
							name: 			'Like',
							namePlural: 	'Likes',
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
							namePlural: 	'Check-ins',
							enabled: 		false
						},
						{
							ID: 			'tip',
							name: 			'Tip',
							namePlural: 	'Tips',
							enabled: 		false
						},
						{
							ID: 			'like',
							name: 			'Like',
							namePlural: 	'Likes',
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
					totalItemsSynced: 121,
					totalItemsAvailable: 10032,
					timestamps: {
						lastCompletedSync: null,
					},
					contentTypes: [
						{
							ID: 			'status-update',
							name: 			'Status Update',
							namePlural: 	'Status Updates'
						},
						{
							ID: 			'link',
							name: 			'Link',
							namePlural: 	'Links'
						},
						{
							ID: 			'checkin',
							name: 			'Check-in',
							namePlural: 	'Check-ins'
						}
					]
				},
				{ 
					ID: 	'twitter',
					name:   'Twitter',
					totalItemsSynced: 329,
					totalItemsAvailable: 2023,
					timestamps: {
						lastCompletedSync: null,
					},
					contentTypes: [
						{
							ID: 			'tweet',
							name: 			'Tweet',
							namePlural: 	'Tweets'
						},
						{
							ID: 			'retweet',
							name: 			'Retweet',
							namePlural: 	'Retweets'
						},
						{
							ID: 			'direct-messages',
							name: 			'Direct Message',
							namePlural: 	'Direct Messages'
						}
					]
				}
			]);

			this.set('sources', [
				{ 
					ID: 	'facebook',
					name:   'Facebook',
					totalItemsSynced: 121,
					totalItemsAvailable: 10032,
					timestamps: {
						lastCompletedSync: null,
					},
					contentTypes: [
						{
							ID: 			'status-update',
							name: 			'Status Update',
							namePlural: 	'Status Updates',
							enabled: 		true
						},
						{
							ID: 			'link',
							name: 			'Link',
							namePlural: 	'Links',
							enabled: 		true
						},
						{
							ID: 			'checkin',
							name: 			'Check-in',
							namePlural: 	'Check-ins',
							enabled: 		true
						},
						{
							ID: 			'photo',
							name: 			'Photo',
							namePlural: 	'Photos',
							enabled: 		false
						},
						{
							ID: 			'video',
							name: 			'Video',
							namePlural: 	'Videos',
							enabled: 		false
						}
					],
					connected: true
				},
				{ 
					ID: 	'twitter',
					name:   'Twitter',
					totalItemsSynced: 329,
					totalItemsAvailable: 2023,
					timestamps: {
						lastCompletedSync: null,
					},
					contentTypes: [
						{
							ID: 			'tweet',
							name: 			'Tweet',
							namePlural: 	'Tweets',
							enabled: 		true
						},
						{
							ID: 			'favorites',
							name: 			'Favorite',
							namePlural: 	'Favorites',
							enabled: 		false
						},
						{
							ID: 			'retweet',
							name: 			'Retweet',
							namePlural: 	'Retweets',
							enabled: 		true
						},
						{
							ID: 			'direct-messages',
							name: 			'Direct Message',
							namePlural: 	'Direct Messages',
							enabled: 		true
						}
					],
					connected: true
				},
				{ 
					ID: 	'instagram',
					name:   'Instagram',
					totalItemsSynced: 0,
					totalItemsAvailable: 102,
					timestamps: {
						lastCompletedSync: null,
					},
					contentTypes: [
						{
							ID: 			'photo',
							name: 			'Photo',
							namePlural: 	'Photos',
							enabled: 		false
						},
						{
							ID: 			'video',
							name: 			'Video',
							namePlural: 	'Videos',
							enabled: 		false
						},
						{
							ID: 			'like',
							name: 			'Like',
							namePlural: 	'Likes',
							enabled: 		false
						}
					],
					connected: false
				},
				{ 
					ID: 	'foursquare',
					name:   'Foursquare',
					totalItemsSynced: 392,
					totalItemsAvailable: 400,
					timestamps: {
						lastCompletedSync: null,
					},
					contentTypes: [
						{
							ID: 			'checkin',
							name: 			'Check-in',
							namePlural: 	'Check-ins',
							enabled: 		false
						},
						{
							ID: 			'tip',
							name: 			'Tip',
							namePlural: 	'Tips',
							enabled: 		false
						},
						{
							ID: 			'like',
							name: 			'Like',
							namePlural: 	'Likes',
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
		responseText: App.SimulatedServer.get('storageSurvey')
	});

	// POST Storage Survey
	$.mockjax({
		url: '/storage-survey',
		dataType: 'json',
		type: 'post',
		responseText: App.SimulatedServer.get('storageSurvey')
	});

	// GET User
	$.mockjax({
		url: '/user',
		dataType: 'json',
		type: 'get',
		responseText: App.SimulatedServer.get('user')
	});

	// GET Storages
	$.mockjax({
		url: '/storages',
		dataType: 'json',
		type: 'get',
		responseText: App.SimulatedServer.get('storages')
	});

	// GET Sources
	$.mockjax({
		url: '/sources',
		dataType: 'json',
		type: 'get',
		responseText: App.SimulatedServer.get('sources')
	});

	// POST Sources
	$.mockjax({
		url: '/sources',
		dataType: 'json',
		type: 'post',
		responseText: App.SimulatedServer.get('sources')
	});
}