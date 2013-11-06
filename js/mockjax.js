$.mockjax({
	url: '/storage-survey',
	dataType: 'json',
	type: 'get',
	responseText: {
		email: 			'example@example.com',
		preference: 	'Amazon S3'
	}
});

$.mockjax({
	url: '/storage-survey',
	dataType: 'json',
	type: 'post',
	responseText: {
		email: 			'example@example.com',
		preference: 	'Amazon S3'
	}
});

$.mockjax({
	url: '/sources',
	dataType: 'json',
	type: 'get',
	responseText: [
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
					enabled: 		false
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
					enabled: 		false
				},
				{
					ID: 			'direct-messages',
					name: 			'Direct Message',
					namePlural: 	'Direct Messages',
					enabled: 		false
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
	]
});