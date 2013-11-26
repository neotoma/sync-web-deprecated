App.SyncSourceContentTypeLegendView = Ember.View.extend({
  tagName: 'li',
  templateName: 'sync_source_content_type_legend',

  totalItemsSynced: function() {
    if (this.get('contentType').get('totalItemsSynced') >= 0) {
      return this.get('contentType').get('totalItemsSynced');
    } else {
      return 'N/A';
    }
  }.property('contentType.totalItemsSynced'),

  totalItemsAvailable: function() {
    if (this.get('contentType').get('totalItemsAvailable') >= 0) {
      return this.get('contentType').get('totalItemsAvailable');
    } else {
      return 'N/A';
    }
  }.property('contentType.totalItemsAvailable'),

  hasTotalItems: function() {
    return (this.get('contentType').totalItemsSynced && this.get('contentType').totalItemsAvailable);
  }.property('contentType.totalItemsSynced', 'contentType.totalItemsAvailable'),

  syncedPercentage: function() {
    if (this.get('contentType').get('totalItemsSynced') && this.get('contentType').get('totalItemsAvailable')) {
      return Math.round(this.get('contentType').get('totalItemsSynced') / this.get('contentType').get('totalItemsAvailable') * 100) + '%';
    } else {
      return 'N/A';
    }
  }.property('contentType.totalItemsSynced', 'contentType.totalItemsAvailable')
});