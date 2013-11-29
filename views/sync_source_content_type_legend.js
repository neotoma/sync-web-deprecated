App.SyncSourceContentTypeLegendView = Ember.View.extend({
  tagName: 'li',
  templateName: 'sync_source_content_type_legend',

  totalItemsSynced: function() {
    if (this.get('contentType.totalItemsSynced') >= 0) {
      return this.get('contentType.totalItemsSynced');
    } else {
      return 'N/A';
    }
  }.property('contentType.totalItemsSynced'),

  totalItemsAvailable: function() {
    if (this.get('contentType.totalItemsAvailable') >= 0) {
      return this.get('contentType.totalItemsAvailable');
    } else {
      return 'N/A';
    }
  }.property('contentType.totalItemsAvailable'),

  hasTotalItems: function() {
    return (this.get('contentType').totalItemsSynced && this.get('contentType').totalItemsAvailable);
  }.property('contentType.totalItemsSynced', 'contentType.totalItemsAvailable'),

  syncedPercentage: function() {
    if (this.get('contentType.totalItemsSynced') && this.get('contentType.totalItemsAvailable')) {
      return Math.round(this.get('contentType.totalItemsSynced') / this.get('contentType.totalItemsAvailable') * 100) + '%';
    } else {
      return 'N/A';
    }
  }.property('contentType.totalItemsSynced', 'contentType.totalItemsAvailable')
});