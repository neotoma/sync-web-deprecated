App = Ember.Application.create({
  LOG_TRANSITIONS:            env.ASHEVILLE_WEB_LOG_TRANSITIONS,
  LOG_TRANSITIONS_INTERNAL:   env.ASHEVILLE_WEB_LOG_TRANSITIONS_INTERNAL,
  LOG_RESOLVER:               env.ASHEVILLE_WEB_LOG_RESOLVER
});

App.Router.map(function() {
  this.route('index', { path: '/' });
  this.route('storages');
  this.route('sources');
  this.route('sync');
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
    window.scrollTo(0, 0);
    
    this.controllerFor('application').set('targetPath', null);
    this.controllerFor('application').handleTransitionStop();
  },

  activate: function() {
    var cssClass = this.toCssClass();
    
    if (cssClass != 'application') {
      $('body').addClass(cssClass);
    }
  },

  deactivate: function() {
    $('body').removeClass(this.toCssClass());
  },

  toCssClass: function() {
    return this.routeName.replace(/\./g, '-').dasherize();
  }
});

$.ajaxSetup({
  xhrFields: {
    withCredentials: true
  }
});

App.ApplicationAdapter = DS.RESTAdapter.extend({
  host:       env.ASHEVILLE_WEB_ADAPTER_HOST,
  namespace:  env.ASHEVILLE_WEB_ADAPTER_NAMESPACE
});

Math.getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}