App.SyncSourceView = Ember.View.extend({
  templateName: 'sync_source',

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