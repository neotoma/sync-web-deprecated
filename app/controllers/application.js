App.ApplicationController = Ember.Controller.extend({
  needs: ['session'],

  sessionUser: function() {
    return this.get('controllers.session.model.user');
  }.property('controllers.session.model.user'),

  indexSelected: function() {
    return this.isSelected('index');
  }.property('currentPath', 'targetPath'),

  sourcesSelected: function() {
    return this.isSelected('sources');
  }.property('currentPath', 'targetPath'),

  syncSelected: function() {
    return this.isSelected('sync');
  }.property('currentPath', 'targetPath'),

  isSelected: function(path) {
    return this.get('currentPath') == path || this.get('targetPath') == path;
  },

  handleTransitionStart: function() {
    this.startLoadingIndicator();
  },

  handleTransitionStop: function() {
    this.stopLoadingIndicator();
  },

  startLoadingIndicator: function() {
    $('#app-loading-indicator').show(500);
  },

  stopLoadingIndicator: function() {
    $('#app-loading-indicator').hide(500);
  }
});