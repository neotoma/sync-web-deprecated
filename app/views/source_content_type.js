App.SourceContentTypeView = Ember.View.extend({
  templateName: 'source_content_type',
  classNames: ['content-type'],
  classNameBindings: ['pending:pending'],

  pending: function() {
    return this.get('contentType.status.hasItemsPending');
  }.property('contentType.status.hasItemsPending'),

  totalItemsSyncedPercentage: function() {
    return (this.get('contentType.percentageItemsSynced')) ? this.get('contentType.percentageItemsSynced') : '0';
  }.property('contentType.percentageItemsSynced'),

  syncBarStyle: function() {
    return 'width: ' + this.get('totalItemsSyncedPercentage') + '%';
  }.property('contentType.status.totalItemsSynced', 'contentType.status.totalItemsAvailable'),

  totalItemsSynced: function() {
    return (this.get('contentType.status.totalItemsSynced') >= 0) ? this.get('contentType.status.totalItemsSynced') : 0;
  }.property('contentType.status.totalItemsSynced'),

  totalItemsAvailable: function() {
    return (this.get('contentType.status.totalItemsAvailable') >= 0) ? this.get('contentType.status.totalItemsAvailable') : 0;
  }.property('contentType.status.totalItemsAvailable')
});