App.SyncStorageView = Ember.View.extend({
  templateName: 'sync_storage',

  /* Sizes */

  size: function(value) {
    if (value == 0) {
      formattedValue = '0 MB';
    } else if (value < 1000000000) {
      formattedValue = Math.round(value / 1000000).toLocaleString('en') + ' MB';
    } else if (value) {
      formattedValue = (value / 1000000000).toFixed(2) + ' GB';
    } else {
      formattedValue = 'N/A';
    }

    return formattedValue;
  },

  availableSize: function() {
    return this.size(this.get('storage').get('sizes').get('available'));
  }.property('storage.sizes.available'),

  filledSize: function() {
    return this.size(this.get('storage').get('sizes').get('total') - this.get('storage').get('sizes').get('available'));
  }.property('storage.sizes.available', 'storage.sizes.total'),

  totalSize: function() {
    return this.size(this.get('storage').get('sizes').get('total'));
  }.property('storage.sizes.total'),

  occupiedSize: function() {
    return this.size(this.get('storage').get('sizes').get('occupied'));
  }.property('storage.sizes.occupied'),

  otherSize: function() {
    return this.size(this.get('storage').get('sizes').get('other'));
  }.property('storage.sizes.other'),

  /* Percentages */

  percentage: function(value) {
    if (value && this.get('storage').get('sizes').get('total')) {
      return (Math.round(value / this.get('storage').get('sizes').get('total') * 100 * 100) / 100).toFixed(2) + '%';
    } else if (value === 0) {
      return '0%';
    } else {
      return 'N/A';
    }
  },

  availablePercentage: function() {
    return this.percentage(this.get('storage').get('sizes').get('available'));
  }.property('storage.sizes.available', 'storage.sizes.total'),

  filledPercentage: function() {
    return this.percentage(this.get('storage').get('sizes').get('total') - this.get('storage').get('sizes').get('available'));
  }.property('storage.sizes.available', 'storage.sizes.total'),

  occupiedPercentage: function() {
    return this.percentage(this.get('storage').get('sizes').get('occupied'));
  }.property('storage.sizes.occupied', 'storage.sizes.total'),

  otherPercentage: function() {
    return this.percentage(this.get('storage').get('sizes').get('other'));
  }.property('storage.sizes.other', 'storage.sizes.total'),

  /* Timestamps */

  timestamp: function(value) {
    if (!value) {
      return null;
    } else if (value == 'Never') {
      return 'Never';
    }

    // add code for formatting value
  },

  lastCompletedSyncTimestamp: function() {
    return this.timestamp(this.get('storage').get('timestamps').get('lastCompletedSync'));
  }.property('storage.timestamps.lastCompletedSync'),

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