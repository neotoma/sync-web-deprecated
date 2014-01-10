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
    var updateRefreshInterval = window.setInterval(function() {
      controller.refreshSources();
      //controller.refreshStorages();
    }, 2000);
    
    this.set('updateRefreshInterval', updateRefreshInterval);

    var serverSimulationRefreshInterval = window.setInterval(function() {
      controller.simulateUpdate();
    }, 2100);
    
    this.set('serverSimulationRefreshInterval', serverSimulationRefreshInterval);

    controller.set('model', model);
  }
});