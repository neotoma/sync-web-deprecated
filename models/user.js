App.User = DS.Model.extend({
  name:       DS.attr('string'),
  email:      DS.attr('string'),
  storages:   DS.hasMany('storage'),
  sources:    DS.hasMany('source'),

  totalStorages: function() {
    return this.get('storages').get('length');
  }.property('storages.length'),

	hasStorage: function() {
		return (this.get('totalStorages'));
	}.property('totalStorages'),

  totalSources: function() {
    return this.get('sources').get('length');
  }.property('sources.length'),

  hasSource: function() {
    return (this.get('totalSources'));
  }.property('totalSources'),

  totalContentTypes: function() {
    var total = 0;

    this.get('sources').forEach(function(source) {
      total += source.get('totalContentTypes');
    });

    return total;
  }.property('sources.@each.totalContentTypes'),

  hasContentType: function() {
    return (this.get('totalContentTypes'));
  }.property('totalContentTypes')
});

if (APP_CONFIG.DATA.FIXTURES_ENABLED.USERS) {
  App.User.FIXTURES = [
    {
      id: 3,
      name: 'Saul Goodman',
      email: 'saul@bettercallsaul.com',
      storages: [1],
      sources: [4,5]
    }
  ];
} else {
  App.User.FIXTURES = [];
}