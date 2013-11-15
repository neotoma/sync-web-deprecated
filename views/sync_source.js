App.SyncSourceView = Ember.View.extend({
  templateName: 'sync_source',

  percentageCompleted: function() {
    return Math.round(this.get('source').get('totalItemsSynced') / this.get('source').get('totalItemsAvailable') * 100) + '%';
  }.property('totalItemsSynced', 'totalItemsAvailable'),

  /* Timestamps */

  timestamp: function(value) {
    if (!value) {
      formattedTimestamp = 'Never';
    }

    // add code for formatting value

    return formattedTimestamp;
  },

  lastCompletedSyncTimestamp: function() {
    return this.timestamp(this.get('source').timestamps.lastCompletedSync);
  }.property('source.timestamps.lastCompletedSync')
})