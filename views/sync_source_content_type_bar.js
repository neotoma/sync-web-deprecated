App.SyncSourceContentTypeBarView = Ember.View.extend({
  templateName: 'sync_source_content_type_bar',
  attributeBindings: ['style'],

  style: function() {
    var percentage = 0;

    if (this.get('contentType.totalItemsAvailable')) {
      percentage = Math.round(this.get('contentType.totalItemsAvailable') / this.get('parentView.totalItemsAvailable') * 100);
    }

    return 'width: ' + percentage + '%';
  }.property('contentType.totalItemsAvailable', 'parentView.totalItemsAvailable'),

  barFilledStyle: function() {
    var percentage = 0;

    if (this.get('contentType.totalItemsSynced')) {
      percentage = Math.round(this.get('contentType.totalItemsSynced') / this.get('contentType.totalItemsAvailable') * 100);
    }
    
    return 'width: ' + percentage + '%';
  }.property('contentType.totalItemsSynced', 'contentType.totalItemsAvailable')
});