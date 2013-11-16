App.SyncSourceContentTypeBarView = Ember.View.extend({
  templateName: 'sync_source_content_type_bar',
  attributeBindings: ['style'],

  style: function() {
    var percentage = Math.round(this.get('contentType').get('totalItemsAvailable') / this.get('parentView').get('totalItemsAvailable') * 100);
    return 'width: ' + percentage + '%';
  }.property('contentType.totalItemsAvailable', 'parentView.totalItemsAvailable'),

  barFilledStyle: function() {
    var percentage = Math.round(this.get('contentType').get('totalItemsSynced') / this.get('contentType').get('totalItemsAvailable') * 100);
    return 'width: ' + percentage + '%';
  }.property('contentType.totalItemsSynced', 'contentType.totalItemsAvailable')
});