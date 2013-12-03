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

  clearSources: function() {
    var user = this.get('controllers.session.user');
    var sources = user.get('sources');
    var i = sources.get('length');

    while(i--) {
      var source = sources.objectAt(i);
      var contentTypes = source.get('contentTypes');
      var k = contentTypes.get('length');

      while(k--) {
        contentTypes.objectAt(k).destroyRecord();
      };

      source.destroyRecord();
    };

    user.set('sources', []);
  },

  saveItem: function(item) {
    var deferred = $.Deferred();
    var user = this.get('controllers.session.user');

    var source = this.store.createRecord('source', {
      type: item.get('type'),
      name: item.get('name'),
      user: user
    });

    item.set('source', source);

    var controller = this;
    source.save().then(function(source) {
      user.get('sources').pushObject(source);

      controller.saveItemContentTypes(item).then(function() {
        deferred.resolve();
      });
    });

    return deferred.promise();
  },

  saveItemContentTypes: function(item) {
    var deferred = $.Deferred();
    var promises = [];
    var controller = this;

    $.each(item.get('contentTypes'), function(key, itemContentType) {
      if (itemContentType.get('enabled')) {
        var contentType = controller.store.createRecord('contentType', {
          type:   itemContentType.get('type'),
          name:   itemContentType.get('name'),
          source: item.get('source')
        });

        promises.push(contentType.save());
      }
    });

    $.when.apply($, promises).then(function(schemas) {
      deferred.resolve();
    });

    return deferred.promise();
  },

  actions: {
    saveItems: function() {
      this.clearSources();
      this.set('isSaving', true);

      var items = this.get('model.items');
      var controller = this;
      var promises = [];

      $.each(items, function(key, item) {
        if (item.get('connected')) {
          promises.push(controller.saveItem(item));
        }
      });

      $.when.apply($, promises).then(function() {
        return controller.get('controllers.session.user').save();
      }).then(function() {
        controller.transitionToRoute('sync').then(function() {
          controller.set('isSaving', false);
        });
      });
    }
  }
});