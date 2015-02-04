App.Status = DS.Model.extend({
  totalItemsAvailable:    DS.attr('number'),
  totalItemsSynced:       DS.attr('number'),
  totalItemsPending:      DS.attr('number'),
  user:                   DS.belongsTo('user'),
  storage:                DS.belongsTo('storage'),
  source:                 DS.belongsTo('source'),
  contentType:            DS.belongsTo('contentType'),
  lastSyncedItem:         DS.belongsTo('item'),

  hasItemSynced: function() {
    return (this.get('totalItemsSynced') > 0);
  }.property('totalItemsSynced'),

  hasItemsPending: function() {
    return (this.get('totalItemsPending') > 0);
  }.property('totalItemsPending'),

  percentageItemsSynced: function() {
    return Math.ceil(this.get('totalItemsSynced') / this.get('totalItemsAvailable') * 100);
  }.property('totalItemsSynced', 'totalItemsAvailable')
});