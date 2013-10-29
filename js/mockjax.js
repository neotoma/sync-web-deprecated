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
		email: 			'example@example.org',
		preference: 	'Amazon S4'
	}
});