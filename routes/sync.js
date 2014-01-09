App.SyncRoute = Ember.Route.extend({
  needs: ['session'],
  
  beforeModel: function() {
    var sessionUser = this.controllerFor('session').get('user');

    if (!sessionUser) {
      this.transitionTo('index');
    } else if(!sessionUser.get('hasSource')) {
      this.transitionTo('sources');
    }
  },

  model: function() {
    return this.controllerFor('session').get('user');
  },

  setupController: function(controller, model) {
    var refreshInterval = window.setInterval(function() {
      controller.refreshSources();
    }, 2000);
    
    this.set('refreshInterval', refreshInterval);

    controller.set('model', model);
  }
});