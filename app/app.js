/* Ember Init */

App = Ember.Application.create(APP_CONFIG.INIT);

App.Router.map(function() {
  this.route('index', { path: '/' });
  this.route('sources', { path: '/sources' });
  this.route('sync', { path: '/sync' });
});

Ember.Route.reopen({
  events: {
    willTransition: function(transition) {
      this.controllerFor('application').set('targetPath', transition.targetName);

      if (transition.targetName != this.controllerFor('application').get('currentPath')) {
        this.controllerFor('application').handleTransitionStart();
      }
    }
  },

  afterModel: function() {
    // Always scroll to top of window after route transition
    window.scrollTo(0, 0);
    
    this.controllerFor('application').set('targetPath', null);
    this.controllerFor('application').handleTransitionStop();
  }
});