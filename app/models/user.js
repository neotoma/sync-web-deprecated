App.User = DS.Model.extend({
  name:             DS.attr('string'),
  email:            DS.attr('string'),
  userSourceAuths:  DS.hasMany('userSourceAuth'),
  sessions:         DS.hasMany('session'),

  totalStorages: function() {
    return this.get('storages.length');
  }.property('storages.length'),

	hasStorage: function() {
		return this.get('totalStorages') ? true : false;
	}.property('totalStorages'),

  totalSources: function() {
    return this.get('sources.length');
  }.property('sources.length'),

  hasSource: function() {
    return this.get('totalSources') ? true : false;
  }.property('totalSources'),

  sourceConnected: function(type) {
    return (this.get('sources').filter(function(source) { 
      return (source.get('type') == type); 
    }).length) ? true : false;
  },

  totalContentTypes: function() {
    var total = 0;

    this.get('sources').forEach(function(source) {
      total += source.get('totalContentTypes');
    });

    return total;
  }.property('sources.@each.totalContentTypes'),

  hasContentType: function() {
    return this.get('totalContentTypes') ? true : false;
  }.property('totalContentTypes'),

  contentTypeEnabled: function(sourceType, contentTypeType) {
    return (this.get('sources').filter(function(source) {
      if (source.get('type') == sourceType) { 
        return (source.get('contentTypes').filter(function(contentType) {
          return (contentType.get('type') == contentTypeType);
        }).length) ? true : false; 
      } else {
        return false;
      }
    }).length) ? true : false;
  },

  loadSources: function() {
    var deferred = $.Deferred();
    var promises = [];

    var sources = user.get('sources').then(function(sources) {
      sources.forEach(function(source) {
        promises.push(source.get('contentTypes'));
      });

      $.when.apply($, promises).then(function() {
        deferred.resolve();
      });
    });

    return deferred.promise();
  },

  deleteSources: function() {
    var sources = this.get('sources');
    var i = sources.get('length');

    console.log('Deleting ' + i + ' sources');

    while(i--) {
      var source = sources.objectAt(i);
      console.log('Deleting source: ', source.get('id'));

      var contentTypes = source.get('contentTypes');
      var k = contentTypes.get('length');

      while(k--) {
        try {
          var contentType = contentTypes.objectAt(k);
          console.log('Deleting content type: ', contentType.get('id'));
          contentType.destroyRecord();
        } catch (e) {
          console.log('Failed to destroy content type:', e);
        }
      };

      //source.set('contentTypes', null);
      
      try {
        source.destroyRecord();
      } catch (e) {
        console.log('Failed to destroy source:', e);
      }
    };

    //this.set('sources', null);
  }
});