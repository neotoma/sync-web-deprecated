App.SourcesRoute = Ember.Route.extend({
  beforeModel: function() {
    var sessionUser = this.modelFor('application');
    
    if (!sessionUser) {
      this.transitionTo('index');
    }
  },

  model: function() {
    return App.SourcesMenu.create();
  }
});