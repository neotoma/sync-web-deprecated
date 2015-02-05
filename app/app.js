App = Ember.Application.create({
  LOG_TRANSITIONS:            env.ASHEVILLE_WEB_LOG_TRANSITIONS,
  LOG_TRANSITIONS_INTERNAL:   env.ASHEVILLE_WEB_LOG_TRANSITIONS_INTERNAL,
  LOG_RESOLVER:               env.ASHEVILLE_WEB_LOG_RESOLVER
});

App.Router.map(function() {
  this.route('index', { path: '/' });
  this.route('dashboard');
});

Ember.Route.reopen({
  afterModel: function() {
    window.scrollTo(0, 0);
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

App.ObjectController = Ember.ObjectController.extend({
  needs: ['session'],
  sessionUser: Ember.computed.alias('controllers.session.user')
});

Ember.Application.initializer({
  name: 'session',

  initialize: function(container) {
    App.deferReadiness();
    
    container.lookup('controller:session').populate().then(function() {
      App.advanceReadiness();
    }, function() {
      console.error('Unable to load session');
      App.advanceReadiness();
    });
  }
});

var socket = io.connect(env.ASHEVILLE_WEB_ADAPTER_HOST);