App.SyncRoute = Ember.Route.extend({
  beforeModel: function(transition) {
    var sessionUser = this.controllerFor('application').get('sessionUser');

    if (!sessionUser) {
      this.transitionTo('index');
    }
  },
  
	model: function() { 
		return this.controllerFor('application').get('sessionUser');
	}
});