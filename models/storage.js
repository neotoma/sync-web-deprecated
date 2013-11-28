App.Storage = DS.Model.extend({
  type:                 DS.attr('string'),
  name:                 DS.attr('string'),
  totalSize:            DS.attr('number'),
  availableSize:        DS.attr('number'),
  occupiedSize:         DS.attr('number'),
  otherSize:            DS.attr('number'),
  lastCompletedSync:    DS.attr('date'),
  user:                 DS.belongsTo('user'),

  availablePercentage: function(size) {
    return (this.get('availableSize') / this.get('totalSize') * 100);
  }.property('availableSize', 'totalSize'),

  occupiedPercentage: function(size) {
    return (this.get('occupiedSize') / this.get('totalSize') * 100);
  }.property('occupiedSize', 'totalSize'),

  otherPercentage: function(size) {
    return (this.get('otherSize') / this.get('totalSize') * 100);
  }.property('otherSize', 'totalSize'),
});

if (APP_CONFIG.DATA.FIXTURES_ENABLED.STORAGES) {
  App.Storage.FIXTURES = [
    {
      id: 1,
      type: 'dropbox',
      name: 'Dropbox',
      totalSize: 5000000000, // 5 GB
      availableSize: 2000000000, // 2 GB
      occupiedSize: 1250000000, // 1.25 GB
      otherSize: 1750000000, // 1.75 GB
      lastCompletedSync: null,
      user: 3
    }
  ];
} else {
  App.Storage.FIXTURES = [];
}