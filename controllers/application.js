App.ApplicationController = Ember.Controller.extend({
  handleTransitionStart: function() {
    $('#app-loading-indicator').show(500);
  },

  handleTransitionStop: function() {
    $('#app-loading-indicator').hide(500);
  }
});