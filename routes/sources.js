App.SourcesRoute = Ember.Route.extend({
  needs: ['session'],

  beforeModel: function() {
    var sessionUser = this.controllerFor('session').get('user');
    
    if (!sessionUser) {
      this.transitionTo('index');
    }
  },

  model: function() {
    var user = this.controllerFor('session').get('user');
    return App.SourcesMenu.create({ user: user });
  }
});