/* Ember Init */

App = Ember.Application.create(APP_CONFIG.INIT);

App.TemplateNames = [
  'application',
  'index',
  'storage_survey',
  'sources',
  'sources_item',
  'sources_item_content_type',
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
    // Always scroll to top of window after route transition
    window.scrollTo(0, 0);
    
    this.controllerFor('application').set('targetPath', null);
    this.controllerFor('application').handleTransitionStop();
  }
});