App.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    if (this.controllerFor('session').get('user')) {
      this.transitionTo('dashboard');
    }
  }
});