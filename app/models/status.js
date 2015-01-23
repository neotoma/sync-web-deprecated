App.Status = DS.Model.extend({
  totalItemsAvailable:    DS.attr('number'),
  totalItemsSynced:       DS.attr('number'),
  user:                   DS.belongsTo('user'),
  storage:                DS.belongsTo('storage'),
  source:                 DS.belongsTo('source'),
  contentType:            DS.belongsTo('contentType'),
  lastSyncedItem:         DS.belongsTo('item')
});