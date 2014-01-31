App.SourcesRoute = Ember.Route.extend({
  needs: ['session'],

  beforeModel: function() {
    var sessionUser = this.controllerFor('session').get('user');
    
    if (!sessionUser) {
      this.transitionTo('index');
    }
  },

  model: function() {
    return App.SourcesMenu.create({ user: this.controllerFor('session').get('user') });
  }
});