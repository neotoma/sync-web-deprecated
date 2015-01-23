App.AuthenticatedRoute = Ember.Route.extend({
  beforeModel: function() {
    if (!this.controllerFor('session').get('model.user')) {
      this.transitionTo('index');
    }
  }
});