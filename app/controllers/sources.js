App.SourcesController = Ember.ArrayController.extend({
  needs: 'session',
  isSaving: null,

  totalConnectedSources: function() {
    var total = 0;
    $.each(this.get('model'), function(key, source) {
      if (source.get('authenticated')) {
        total = total + 1;
      }
    });
    return total;
  }.property('model.@each.authenticated'),

  totalEnabledContentTypes: function() {
    var total = 0;
    $.each(this.get('model'), function(key, source) {
      if (source.get('totalEnabledContentTypes')) {
        total = total + source.get('totalEnabledContentTypes');
      }
    });
    return total;
  }.property('model.@each.totalEnabledContentTypes'),

  hasEnabledContentType: function() {
    return (this.get('totalEnabledContentTypes')) ? true : false;
  }.property('totalEnabledContentTypes'),

  isDisabled: function() {
    return false;

    if (!this.get('controllers.session.model.user.hasSource')) {
      return (!this.get('totalEnabledContentTypes') || this.get('isSaving'));
    } else {
      return (!this.get('totalEnabledContentTypes') || this.get('isSaving') || !this.get('model.isDirty'));
    }
  }.property('totalEnabledContentTypes', 'isSaving', 'model.isDirty'),

  saveLabel: function() {
    if (!this.get('controllers.session.model.user.hasSource')) {
      if (this.get('isSaving')) {
          return 'Loading...';
      } else {
          return 'Start Backing Up';
      }
    } else {
      if (this.get('isSaving')) {
          return 'Saving...';
      } else {
          return 'Save Changes';
      }
    }
  }.property('isSaving'),

  saveItem: function(item) {
    var deferred = $.Deferred();
    var user = this.get('controllers.session.user');

    var source = this.store.createRecord('source', {
      type: item.get('type'),
      name: item.get('name'),
      user: user
    });

    var controller = this;
    source.save().then(function(source) {
      item.set('source', source);
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

        var deferredContentType = $.Deferred();

        contentType.save().then(function() {
          item.get('source.contentTypes').pushObject(contentType);
          deferredContentType.resolve();
        });

        promises.push(deferredContentType.promise());
      }
    });

    $.when.apply($, promises).then(function(schemas) {
      deferred.resolve();
    });

    return deferred.promise();
  },

  userHasNoSource: function() {
    return this.get('controllers.session.model.user.hasSource') ? false : true;
  }.property('controllers.session.model.user.hasSource'),

  actions: {
    saveItems: function() {
      this.get('controllers.session.user').deleteSources();
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