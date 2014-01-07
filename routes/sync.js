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
    var sessionUser = this.controllerFor('session').get('user');

    this.set('refreshInterval', window.setInterval(function() {
      sessionUser.reload();
      sessionUser.get('sources').forEach(function(source) {
        source.get('contentTypes').forEach(function(contentType) {
          contentType.reload();
        });
      });

      console.log('Refreshed!');
    }, 2000));

    controller.set('model', model);
  }
});