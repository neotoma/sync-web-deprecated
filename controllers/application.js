App.ApplicationController = Ember.Controller.extend({
  actions: {
    goToHome: function() {
      this.transitionToRoute('index');
    },
    goToSources: function() {
      this.transitionToRoute('sources');
    },
    goToSync: function() {
      this.transitionToRoute('sync');
    }
  }
});