App.User = DS.Model.extend({
  name:       DS.attr('string'),
  email:      DS.attr('string'),
  storages:   DS.hasMany('storage'),
  sources:    DS.hasMany('source'),

  totalStorages: function() {
    return this.get('storages').length;
  }.property('storages.@each'),

	hasStorage: function() {
		return (this.get('totalStorages'));
	}.property('totalStorages'),

  totalSources: function() {
    return this.get('sources').length;
  }.property('sources.@each'),

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
      id: 'fixture-1',
      name: 'Saul Goodman',
      email: 'saul@bettercallsaul.com'
    }
  ];
} else {
  App.User.FIXTURES = [];
}