App.SourcesController = Ember.ArrayController.extend({
  needs: 'session',
  isSaving: null,

  totalAuthedSources: function() {
    var total = 0;

    this.get('model').forEach(function(source) {
      if (source.get('authed')) {
        total = total + 1;
      }
    });

    return total;
  }.property('model.@each.authed'),

  noAuthedSources: function() {
    return this.get('totalAuthedSources') ? false : true;
  }.property('totalAuthedSources'),

  totalEnabledContentTypes: function() {
    var total = 0;

    this.get('model').forEach(function(source) {
      if (source.get('authed')) {
        total = total + source.get('totalContentTypes');
      }
    });

    return total;
  }.property('model.@each.authed'),

  hasEnabledContentType: function() {
    return (this.get('totalEnabledContentTypes')) ? true : false;
  }.property('totalEnabledContentTypes'),

  isDisabled: function() {
     return !this.get('totalEnabledContentTypes');
  }.property('totalEnabledContentTypes'),

  syncSourcesLabel: function() {
    if (!this.get('controllers.session.model.user.hasSource')) {
      if (this.get('isSaving')) {
          return 'Loading...';
      } else {
          return 'Start Backing Up';
      }
    } else {
      if (this.get('isSaving')) {
          return 'Saving...';
      } else {
          return 'Save Changes';
      }
    }
  }.property('isSaving'),

  actions: {
    syncSources: function() {
      $.post(APP_CONFIG.DATA.HOST + '/sources/sync');
      this.transitionToRoute('sync');
    }
  }
});