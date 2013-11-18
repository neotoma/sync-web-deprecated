App.ApplicationController = Ember.Controller.extend({
  handleTransitionStart: function() {
    $('#app-loading-indicator').show(500);
  },

  handleTransitionStop: function() {
    $('#app-loading-indicator').hide(500);
  },

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
  }
});