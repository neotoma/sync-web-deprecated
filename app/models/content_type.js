App.ContentType = DS.Model.extend({
  name:         DS.attr('string'),
  pluralName:   DS.attr('string'),
  sources:      DS.hasMany('source'),
  status:       DS.belongsTo('status'),

  hasTotalItemsAvailable: function() {
    return (this.get('totalItemsAvailable'));
  }.property('this.totalItemsAvailable'),

  hasTotalItemsSynced: function() {
    return (this.get('totalItemsSynced'));
  }.property('contentType.totalItemsSynced'),
});