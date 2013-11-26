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