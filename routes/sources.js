App.SourcesRoute = Ember.Route.extend({
  beforeModel: function(transition) {
    var sessionUser = this.controllerFor('application').get('sessionUser');

    if (!sessionUser) {
      this.transitionTo('index');
    }
  },
  
  model: function() {
    return App.SourcesMenu.create();
  }
});