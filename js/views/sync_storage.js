App.SyncStorageView = Ember.View.extend({
  templateName: 'sync_storage',

  /* Sizes */

  size: function(value) {
    if (value < 1000000000) {
      formattedValue = Math.round(value / 1000000).toLocaleString('en') + ' MB';
    } else {
      formattedValue = (value / 1000000000).toFixed(2) + ' GB';
    }

    return formattedValue;
  },

  availableSize: function() {
    return this.size(this.get('storage').get('sizes').available);
  }.property('storage.sizes.available'),

  filledSize: function() {
    return this.size(this.get('storage').get('sizes').total - this.get('storage').get('sizes').available);
  }.property('storage.sizes.available', 'storage.sizes.total'),

  totalSize: function() {
    return this.size(this.get('storage').get('sizes').total);
  }.property('storage.sizes.total'),

  occupiedSize: function() {
    return this.size(this.get('storage').get('sizes').occupied);
  }.property('storage.sizes.occupied'),

  otherSize: function() {
    return this.size(this.get('storage').get('sizes').other);
  }.property('storage.sizes.other'),

  /* Percentages */

  percentage: function(value) {
    return Math.round(value / this.get('storage').get('sizes').total * 100) + '%';
  },

  availablePercentage: function() {
    return this.percentage(this.get('storage').get('sizes').available);
  }.property('storage.sizes.available', 'storage.sizes.total'),

  filledPercentage: function() {
    return this.percentage(this.get('storage').get('sizes').total - this.get('storage').get('sizes').available);
  }.property('storage.sizes.available', 'storage.sizes.total'),

  occupiedPercentage: function() {
    return this.percentage(this.get('storage').get('sizes').occupied);
  }.property('storage.sizes.occupied', 'storage.sizes.total'),

  otherPercentage: function() {
    return this.percentage(this.get('storage').get('sizes').other);
  }.property('storage.sizes.other', 'storage.sizes.total'),

  /* Timestamps */

  timestamp: function(value) {
    if (!value) {
      formattedTimestamp = 'Never';
    }

    // add code for formatting value

    return formattedTimestamp;
  },

  lastCompletedSyncTimestamp: function() {
    return this.timestamp(this.get('storage').timestamps.lastCompletedSync);
  }.property('storages.timestamps.lastCompletedSync'),

  /* Bar Width Styles */

  availableBarWidthStyle: function() {
    return 'width: ' + this.get('availablePercentage') + '%';
  }.property('this.availablePercentage'),

  occupiedBarWidthStyle: function() {
    return 'width: ' + this.get('occupiedPercentage') + '%';
  }.property('this.occupiedPercentage'),

  otherBarWidthStyle: function() {
    return 'width: ' + this.get('otherPercentage') + '%';
  }.property('this.otherPercentage')
})