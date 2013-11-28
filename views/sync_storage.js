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
    return this.size(this.get('storage').get('availableSize'));
  }.property('storage.availableSize'),

  filledSize: function() {
    return this.size(this.get('storage').get('totalSize') - this.get('storage').get('availableSize'));
  }.property('storage.availableSize', 'storage.totalSize'),

  totalSize: function() {
    return this.size(this.get('storage').get('totalSize'));
  }.property('storage.totalSize'),

  occupiedSize: function() {
    return this.size(this.get('storage').get('occupiedSize'));
  }.property('storage.occupiedSize'),

  otherSize: function() {
    return this.size(this.get('storage').get('otherSize'));
  }.property('storage.otherSize'),

  /* Percentages */

  percentage: function(value) {
    if (value && this.get('storage').get('totalSize')) {
      return (Math.round(value / this.get('storage').get('totalSize') * 100 * 100) / 100).toFixed(2) + '%';
    } else if (value === 0) {
      return '0%';
    } else {
      return 'N/A';
    }
  },

  availablePercentage: function() {
    return this.percentage(this.get('storage').get('availableSize'));
  }.property('storage.availableSize', 'storage.totalSize'),

  filledPercentage: function() {
    return this.percentage(this.get('storage').get('totalSize') - this.get('storage').get('availableSize'));
  }.property('storage.availableSize', 'storage.totalSize'),

  occupiedPercentage: function() {
    return this.percentage(this.get('storage').get('occupiedSize'));
  }.property('storage.occupiedSize', 'storage.totalSize'),

  otherPercentage: function() {
    return this.percentage(this.get('storage').get('otherSize'));
  }.property('storage.otherSize', 'storage.totalSize'),

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
    return this.timestamp(this.get('storage').get('lastCompletedSync'));
  }.property('storage.lastCompletedSync'),

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