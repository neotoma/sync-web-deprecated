App.SyncSourceView = Ember.View.extend({
  templateName: 'sync_source',

  totalItemsSynced: function() {
    var total = 0;

    $.each(this.get('source').get('contentTypes'), function(key, contentType) {
      total = total + contentType.get('totalItemsSynced');
    });

    return total;
  }.property('contentTypes.@each.totalItemsSynced'),

  totalItemsAvailable: function() {
    var total = 0;

    $.each(this.get('source').get('contentTypes'), function(key, contentType) {
      total = total + contentType.get('totalItemsAvailable');
    });

    return total;
  }.property('contentTypes.@each.totalItemsAvailable'),

  percentageItemsSynced: function() {
    return Math.round(this.get('totalItemsSynced') / this.get('totalItemsAvailable') * 100) + '%';
  }.property('totalItemsSynced', 'totalItemsAvailable'),

  /* Timestamps */

  timestamp: function(value) {
    if (!value) {
      formattedTimestamp = '?';
    } else if (value == 'Never') {
      formattedTimestamp = 'Never';
    }

    // add code for formatting value

    return formattedTimestamp;
  },

  lastCompletedSyncTimestamp: function() {
    return this.timestamp(this.get('source').timestamps.lastCompletedSync);
  }.property('source.timestamps.lastCompletedSync')
})