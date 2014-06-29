App.SourcesRoute = Ember.Route.extend({
  needs: ['session'],

  beforeModel: function() {
    if (!this.controllerFor('session').get('model.user')) {
      this.transitionTo('index');
    }
  },

  model: function() {
    return this.store.find('source');
  }
});