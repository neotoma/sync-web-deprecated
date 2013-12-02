App.SourcesController = Ember.ObjectController.extend({
  needs: 'session',
  isSaving: null,

  hasConnectedSources: function() {
    return (this.get('model.totalConnectedSources'));
  }.property('model.totalConnectedSources'),

  isDisabled: function() {
    return (!this.get('model.totalEnabledContentTypes') || this.get('isSaving'));
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
      var session_user = this.get('controllers.session.user');
      var source_save_promises = [];

      $.each(this.get('model.items'), function(key, item) {
        if (item.get('connected')) {
          var source = controller.store.createRecord('source', {
            type: item.get('type'),
            name: item.get('name'),
            user: session_user
          });

          source_save_promises.push(source.save().then(function(source) {
            var content_type_save_promises = [];

            $.each(item.get('contentTypes'), function(key, itemContentType) {
              if (itemContentType.get('enabled')) {
                content_type_save_promises.push(controller.store.createRecord('contentType', {
                  type: itemContentType.get('type'),
                  name: itemContentType.get('name'),
                  source: source
                }).save());
              }
            });

            return $.when.apply($, content_type_save_promises);
          }));
        }
      });

      return $.when.apply($, source_save_promises).then(function(sources) {
        session_user.save().then(function() {
            controller.transitionToRoute('sync').then(function() {
            controller.set('isSaving', false);
          });
        });
      });
    }
  }
});