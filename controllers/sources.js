App.SourcesController = Ember.ObjectController.extend({
  isSaving: null,

  hasConnectedSources: function() {
    return (this.get('model').get('totalConnectedSources'));
  }.property('model.totalConnectedSources'),

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
      var controller = this;

      var session_user = this.controllerFor('application').get('sessionUser');
      var sources = [];

      $.each(this.get('model').get('items'), function(key, item) {
        if (item.get('connected')) {
          var source = controller.store.createRecord('source', {
            type: item.get('type'),
            name: item.get('name'),
            user: session_user
          });
          var contentTypes = [];

          $.each(item.get('contentTypes'), function(key, itemContentType) {
            if (itemContentType.get('enabled')) {
              var contentType = controller.store.createRecord('contentType', {
                type: itemContentType.get('type'),
                name: itemContentType.get('name'),
                source: source
              });
              contentType.save();
              contentTypes.push(contentType);
            }
          });

          source.set('contentTypes', contentTypes);
          source.save();
          sources.push(source);
        }
      });

      session_user.set('sources', sources);

      return session_user.save().then(function() {
        controller.transitionToRoute('sync').then(function() {
          controller.set('isSaving', false);
        });
      });
    }
  }
});