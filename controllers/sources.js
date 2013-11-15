App.SourcesController = Ember.ObjectController.extend({
  isSubmitting: null,

  isDisabled: function() {
    return (!this.get('model').get('totalEnabledContentTypes') || this.get('isSubmitting'));
  }.property('totalEnabledContentTypes', 'isSubmitting'),

  saveLabel: function() {
    if (this.get('isSubmitting')) {
        return 'Loading...';
    } else {
        return 'Start Backing Up';
    }
  }.property('isSubmitting'),

  actions: {
    saveSources: function() {
      this.set('isSubmitting', true);
      target = this;

      App.Sources.post(
        this.get('model'),

        function(response) {
          target.transitionToRoute('sync').then(function() {
            target.set('isSubmitting', false);
          });
        },
         
        function(reason) {
          target.set('isSubmitting', false);
        }
      );
    }
  }
});