App.SyncRoute = Ember.Route.extend({
  needs: ['session'],
  
  beforeModel: function() {
    var sessionUser = this.controllerFor('session').get('user');

    if (!sessionUser) {
      this.transitionTo('index');
    } else if(!sessionUser.get('hasUserSourceAuth')) {
      this.transitionTo('sources');
    }
  },

  model: function() {
    return this.controllerFor('session').get('user');
  },

  setupController: function(controller, model) {
    if (!this.get('updateRefreshInterval')) {
      var updateRefreshInterval = window.setInterval(function() {
        controller.refreshSources();
        controller.refreshStorages();
      }, 1000);
      
      this.set('updateRefreshInterval', updateRefreshInterval);
    }

    if (!this.get('serverSimulationRefreshInterval')) {
      var serverSimulationRefreshInterval = window.setInterval(function() {
        controller.simulateUpdate();
      }, 1600);
      
      this.set('serverSimulationRefreshInterval', serverSimulationRefreshInterval);
    }

    controller.set('model', model);
  },

  actions: {
    willTransition: function(transition) {
      window.clearInterval(this.get('updateRefreshInterval'));
      window.clearInterval(this.get('serverSimulationRefreshInterval'));

      this.set('updateRefreshInterval', null);
      this.set('serverSimulationRefreshInterval', null);
    }
  }
});