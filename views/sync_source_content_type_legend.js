App.SyncSourceContentTypeLegendView = Ember.View.extend({
  tagName: 'li',
  templateName: 'sync_source_content_type_legend',

  syncedPercentage: function() {
    var percentage = Math.round(this.get('contentType').get('totalItemsSynced') / this.get('contentType').get('totalItemsAvailable') * 100);
    return percentage + '%';
  }.property('contentType.totalItemsSynced', 'contentType.totalItemsAvailable')
});