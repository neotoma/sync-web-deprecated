/* Server Model */

App.Server = Ember.Object.extend({
	presets: 				{},
	storageSurvey: 			{},
	user: 					{},
	storages: 				{},
	sources: 				{},

	init: function() {

		if (!this.get('presets').storageSurvey) {
			this.set('storageSurvey', {
				email: 			null,
				preference: 	null
			});
		} else {
			this.set('storageSurvey', {
				email: 			'example@example.com',
				preference: 	'Amazon S3'
			});
		}

		if (!this.get('presets').user) {
			this.set('user', {
				ID: 		null,
				email: 		null
			});
		} else {
			this.set('user', {
				ID: 		1,
				email: 		'example@example.org'
			});
		}

		if (!this.get('presets').storages) {
			this.set('storages', []);
		} else {
			this.set('storages', [
				'dropbox'
			]);
		}

		if (!this.get('presets').sources) {
			this.set('sources', [
				{ 
					ID: 	'facebook',
					name:   'Facebook',
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
							enabled: 		true
						},
						{
							ID: 			'video',
							name: 			'Video',
							namePlural: 	'Videos',
							enabled: 		true
						}
					],
					connected: false
				},
				{ 
					ID: 	'twitter',
					name:   'Twitter',
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
							enabled: 		true
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
					connected: false
				},
				{ 
					ID: 	'instagram',
					name:   'Instagram',
					contentTypes: [
						{
							ID: 			'photo',
							name: 			'Photo',
							namePlural: 	'Photos',
							enabled: 		true
						},
						{
							ID: 			'video',
							name: 			'Video',
							namePlural: 	'Videos',
							enabled: 		true
						},
						{
							ID: 			'like',
							name: 			'Like',
							namePlural: 	'Likes',
							enabled: 		true
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
							namePlural: 	'Check-ins',
							enabled: 		true
						},
						{
							ID: 			'tip',
							name: 			'Tip',
							namePlural: 	'Tips',
							enabled: 		true
						},
						{
							ID: 			'like',
							name: 			'Like',
							namePlural: 	'Likes',
							enabled: 		true
						}
					],
					connected: false
				}
			]);
		} else {
			this.set('sources', [
				{ 
					ID: 	'facebook',
					name:   'Facebook',
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
							enabled: 		true
						},
						{
							ID: 			'video',
							name: 			'Video',
							namePlural: 	'Videos',
							enabled: 		true
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
							namePlural: 	'Tweets',
							enabled: 		true
						},
						{
							ID: 			'favorites',
							name: 			'Favorite',
							namePlural: 	'Favorites',
							enabled: 		true
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
					contentTypes: [
						{
							ID: 			'photo',
							name: 			'Photo',
							namePlural: 	'Photos',
							enabled: 		true
						},
						{
							ID: 			'video',
							name: 			'Video',
							namePlural: 	'Videos',
							enabled: 		true
						},
						{
							ID: 			'like',
							name: 			'Like',
							namePlural: 	'Likes',
							enabled: 		true
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
							namePlural: 	'Check-ins',
							enabled: 		true
						},
						{
							ID: 			'tip',
							name: 			'Tip',
							namePlural: 	'Tips',
							enabled: 		true
						},
						{
							ID: 			'like',
							name: 			'Like',
							namePlural: 	'Likes',
							enabled: 		true
						}
					],
					connected: false
				}
			]);
		}
	}
});

var server = App.Server.create({ presets: {
	storageSurvey: 	false,
	user: 			false,
	storages: 		false,
	sources: 		false
}});

/* API Requests */

// GET Storage Survey
$.mockjax({
	url: '/storage-survey',
	dataType: 'json',
	type: 'get',
	responseText: server.get('storageSurvey')
});

// POST Storage Survey
$.mockjax({
	url: '/storage-survey',
	dataType: 'json',
	type: 'post',
	responseText: server.get('storageSurvey')
});

// GET User
$.mockjax({
	url: '/user',
	dataType: 'json',
	type: 'get',
	responseText: server.get('user')
});

// GET Storages
$.mockjax({
	url: '/storages',
	dataType: 'json',
	type: 'get',
	responseText: server.get('storages')
});

// GET Sources
$.mockjax({
	url: '/sources',
	dataType: 'json',
	type: 'get',
	responseText: server.get('sources')
});