App.SourcesController = Ember.ObjectController.extend({
  isSubmitting: null,

  isDisabled: function() {
    return (!this.get('model').get('totalEnabledContentTypes') || this.get('isSubmitting'));
  }.property('totalEnabledContentTypes', 'isSubmitting'),

  saveLabel: function() {
    if (this.get('isSubmitting')) {
        return 'Loading...';
    } else {
        return 'Start Backing Them Up';
    }
  }.property('isSubmitting'),

  actions: {
    saveSources: function() {
      this.set('isSubmitting', true);
      target = this;

      App.Sources.post(
        this.get('model'), 
        function(response) {
          target.set('isSubmitting', false);
          this.transitionToRoute('sync');
        }, 
        function(reason) {
          target.set('isSubmitting', false);
        }
      );
    }
  }
});