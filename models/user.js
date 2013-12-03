App.User = DS.Model.extend({
  name:       DS.attr('string'),
  email:      DS.attr('string'),
  storages:   DS.hasMany('storage', { async: true }),
  sources:    DS.hasMany('source', { async: true }),

  totalStorages: function() {
    return this.get('storages').get('length');
  }.property('storages.length'),

	hasStorage: function() {
		return this.get('totalStorages') ? true : false;
	}.property('totalStorages'),

  totalSources: function() {
    return this.get('sources').get('length');
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
  }
});

if (APP_CONFIG.DATA.FIXTURES_ENABLED.USERS) {
  App.User.FIXTURES = [
    {
      id: 3,
      name: 'Saul Goodman',
      email: 'saul@bettercallsaul.com'
    }
  ];

  if (APP_CONFIG.DATA.FIXTURES_ENABLED.STORAGES) {
    App.User.FIXTURES[0].storages = [1];
  }

  if (APP_CONFIG.DATA.FIXTURES_ENABLED.SOURCES) {
    App.User.FIXTURES[0].sources = [4,5];
  }
} else {
  App.User.FIXTURES = [];
}