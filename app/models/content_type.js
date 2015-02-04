App.ContentType = DS.Model.extend({
  name:         DS.attr('string'),
  pluralName:   DS.attr('string'),
  sources:      DS.hasMany('source'),
  status:       DS.belongsTo('status'),

  percentageItemsSynced: function() {
    return this.get('status.percentageItemsSynced');
  }.property('status.percentageItemsSynced')
});