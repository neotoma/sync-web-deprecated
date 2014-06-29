App.ContentType = DS.Model.extend({
  name:                 DS.attr('string'),
  totalItemsAvailable:  DS.attr('number', { defaultValue: 0 }),
  totalItemsSynced:     DS.attr('number', { defaultValue: 0 }),
  isSyncing:            DS.attr('boolean', { defaultValue: false }),
  source:               DS.hasMany('source', { async: true })
});