App.User = DS.Model.extend({
  name:       DS.attr('string'),
  email:      DS.attr('string'),
  storages:   DS.hasMany('storage'),
  sources:    DS.hasMany('source'),

  isAuthenticated: function() {
    return (this.get('ID'));
  }.property('ID'),

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

    $.each(this.get('sources'), function(key, source) {
      total += source.get('totalContentTypes');
    });

    return total;
  }.property('sources.@each.totalContentTypes'),

  hasContentType: function() {
    return (this.get('totalContentTypes'));
  }.property('totalContentTypes')
});