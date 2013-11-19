App = Ember.Application.create({
  LOG_TRANSITIONS: APP_CONFIGURATION.initialization.logTransitions,
  LOG_TRANSITIONS_INTERNAL: APP_CONFIGURATION.initialization.logTransitionsInternal,
});

App.Config = Ember.Object.create();

App.TemplateNames = [
  'application',
  'index',
  'storage_survey',
  'sources',
  'sources_source',
  'sources_source_content_type',
  'sync',
  'sync_storage',
  'sync_source',
  'sync_source_content_type_bar',
  'sync_source_content_type_legend'
];

for (var i = 0; i < App.TemplateNames.length; i++) {
  $.ajax({
    url: 'templates/' + App.TemplateNames[i] + '.hbs',         
    async: false,
    success: function (response) {
      Ember.TEMPLATES[App.TemplateNames[i]] = Ember.Handlebars.compile(response);
    }
  });
}

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
    window.scrollTo(0, 0);
    this.controllerFor('application').set('targetPath', null);
    this.controllerFor('application').handleTransitionStop();
  }
});