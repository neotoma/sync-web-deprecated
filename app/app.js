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

Ember.Application.initializer({
  name: 'session',

  initialize: function(container) {
    App.deferReadiness();
    var store = container.lookup('store:main');
    var initializer = this;
    var user;

    var loadSources = function() {
      var deferred = $.Deferred();
      var promises = [];

      var sources = user.get('sources').then(function(sources) {
        loadContentTypes(sources).then(function() {
          deferred.resolve();
        });
      });

      return deferred.promise();
    };

    var loadContentTypes = function(sources) {
      var deferred = $.Deferred();
      var promises = [];
      
      sources.forEach(function(source) {
        promises.push(loadContentTypesForSource(source));
      });

      $.when.apply($, promises).then(function() {
        deferred.resolve();
      });

      return deferred.promise();
    };

    var loadContentTypesForSource = function(source) {
      var deferred = $.Deferred();

      source.get('contentTypes').then(function(contentTypes) {
        deferred.resolve();
      });

      return deferred.promise();
    };

    return store.find('user').then(function(users) {
      user = users.get('firstObject');

      if (user) {
        container.lookup('controller:session').set('user', user);

        loadSources(user).then(function() {
          App.advanceReadiness();
        });
      } else {
        App.advanceReadiness();
      }
    });
  }
});