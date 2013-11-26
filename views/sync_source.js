App.SyncSourceView = Ember.View.extend({
  templateName: 'sync_source',

  totalItemsSynced: function() {
    var total = 0;

    $.each(this.get('source').get('contentTypes'), function(key, contentType) {
      if (contentType.get('totalItemsSynced')) {
        total = total + contentType.get('totalItemsSynced');
      }
    });

    return total;
  }.property('contentTypes.@each.totalItemsSynced'),

  totalItemsAvailable: function() {
    var total = 0;

    $.each(this.get('source').get('contentTypes'), function(key, contentType) {
      if (contentType.get('totalItemsAvailable')) {
        total = total + contentType.get('totalItemsAvailable');
      }
    });

    return total;
  }.property('contentTypes.@each.totalItemsAvailable'),

  hasTotalItems: function() {
    return (this.totalItemsSynced && this.totalItemsAvailable);
  }.property('totalItemsSynced', 'totalItemsAvailable'),

  percentageItemsSynced: function() {
    if (this.get('totalItemsSynced') && this.get('totalItemsAvailable')) {
      return Math.round(this.get('totalItemsSynced') / this.get('totalItemsAvailable') * 100) + '%';
    } else {
      return null;
    }
  }.property('totalItemsSynced', 'totalItemsAvailable'),

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
    return this.timestamp(this.get('source').timestamps.lastCompletedSync);
  }.property('source.timestamps.lastCompletedSync'),

  hasHeaderInformation: function() {
    return (this.hasTotalItems || this.lastCompletedSyncTimestamp);
  }.property('hasTotalItems', 'lastCompletedSyncTimestamp')
})