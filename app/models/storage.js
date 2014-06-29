App.Storage = DS.Model.extend({
  type:                 DS.attr('string'),
  name:                 DS.attr('string'),
  totalSize:            DS.attr('number', { defaultValue: 0 }),
  availableSize:        DS.attr('number', { defaultValue: 0 }),
  occupiedSize:         DS.attr('number', { defaultValue: 0 }),
  otherSize:            DS.attr('number', { defaultValue: 0 }),
  lastCompletedSync:    DS.attr('date'),
  isSyncing:            DS.attr('boolean', { defaultValue: false }),
  user:                 DS.belongsTo('user'),

  availablePercentage: function() {
    return (this.get('availableSize') / this.get('totalSize') * 100);
  }.property('availableSize', 'totalSize'),

  occupiedPercentage: function() {
    return (this.get('occupiedSize') / this.get('totalSize') * 100);
  }.property('occupiedSize', 'totalSize'),

  otherPercentage: function() {
    return (this.get('otherSize') / this.get('totalSize') * 100);
  }.property('otherSize', 'totalSize'),
});