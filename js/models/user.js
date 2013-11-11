App.User = Ember.Object.extend({
	resource: 		'/user',
	ID: 			null,
	email: 			null,
	init: function() {
		this.GET(
			this.get('resource'),
			function(response) {
				target.set('ID', response.ID);
				target.set('email', response.email);
			}
		);
	}
});