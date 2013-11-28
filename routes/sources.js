App.SourcesRoute = Ember.Route.extend({
  model: function() {
    return App.SourcesMenu.create();
  },

  setupController: function(controller, model) {
    console.log(model);
    controller.set('model', model);
  }
});