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
      var sessionUser = this.get('controllers.session.user');
      var sourceSavePromises = [];

      sessionUser.set('sources', []);

      $.each(this.get('model.items'), function(key, item) {
        if (item.get('connected')) {
          var source = controller.store.createRecord('source', {
            type: item.get('type'),
            name: item.get('name'),
            user: sessionUser
          });

          sourceSavePromises.push(source.save().then(function(source) {
            sessionUser.get('sources').pushObject(source);

            var contentTypeSavePromises = [];

            $.each(item.get('contentTypes'), function(key, itemContentType) {
              if (itemContentType.get('enabled')) {
                var content_type = controller.store.createRecord('contentType', {
                  type: itemContentType.get('type'),
                  name: itemContentType.get('name'),
                  source: source
                });

                contentTypeSavePromises.push(content_type.save());
              }
            });

            return $.when.apply($, contentTypeSavePromises);
          }));
        }
      });

      return $.when.apply($, sourceSavePromises).then(function() {
        sessionUser.save().then(function() {
          controller.transitionToRoute('sync').then(function() {
            controller.set('isSaving', false);
          });
        });
      });
    }
  }
});