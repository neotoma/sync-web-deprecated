App.SourcesController = Ember.ObjectController.extend({
  isSaving: null,

  isDisabled: function() {
    return (!this.get('model').get('totalEnabledContentTypes') || this.get('isSaving'));
  }.property('totalEnabledContentTypes', 'isSaving'),

  saveLabel: function() {
    if (this.get('isSaving')) {
        return 'Loading...';
    } else {
        return 'Start Backing Up';
    }
  }.property('isSaving'),

  actions: {
    saveSources: function() {
      this.set('isSaving', true);
      target = this;

      App.Sources.post(
        this.get('model'),
        function(response) {
          target.transitionToRoute('sync').then(function() {
            target.set('isSaving', false);
          });
        },
        function(reason) {
          target.set('isSaving', false);
        }
      );
    }
  }
});