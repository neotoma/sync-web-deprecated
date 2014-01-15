App.SyncSourceView = App.SyncSectionView.extend({
  templateName: 'sync_source',

  totalItemsSynced: function() {
    var total = 0;

    this.get('source.contentTypes').forEach(function(contentType) {
      if (contentType.get('totalItemsSynced')) {
        total = total + contentType.get('totalItemsSynced');
      }
    });

    return total;
  }.property('contentTypes.@each.totalItemsSynced'),

  totalItemsAvailable: function() {
    var total = 0;

    this.get('source.contentTypes').forEach(function(contentType) {
      if (contentType.get('totalItemsAvailable')) {
        total = total + contentType.get('totalItemsAvailable');
      }
    });

    return total;
  }.property('source.contentTypes.@each.totalItemsAvailable'),

  hasTotalItems: function() {
    return (this.get('totalItemsSynced') && this.get('totalItemsAvailable'));
  }.property('totalItemsSynced', 'totalItemsAvailable'),

  percentageItemsSynced: function() {
    if (this.get('totalItemsSynced') && this.get('totalItemsAvailable')) {
      return Math.round(this.get('totalItemsSynced') / this.get('totalItemsAvailable') * 100) + '%';
    } else {
      return null;
    }
  }.property('totalItemsSynced', 'totalItemsAvailable'),

  totalContentTypesSyncing: function() {
    var total = 0;

    this.get('source.contentTypes').forEach(function(contentType) {
      if (contentType.get('isSyncing')) {
        total = total + 1;
      }
    });

    return total;
  }.property('source.contentTypes.@each.isSyncing'),

  isSyncing: function() {
    return (this.get('totalContentTypesSyncing') > 0);
  }.property('totalContentTypesSyncing'),

  lastCompletedSyncTimestamp: function() {
    return this.timestamp(this.get('source.lastCompletedSync'));
  }.property('source.lastCompletedSync')
})