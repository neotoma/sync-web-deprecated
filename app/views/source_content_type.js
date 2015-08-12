App.SourceContentTypeView = Ember.View.extend({
  templateName: 'source_content_type',
  classNames: ['content-type'],
  classNameBindings: ['pending:pending', 'contentType.status.totalItemsAvailable:hasTotalItemsAvailable:hasNoTotalItemsAvailable'],

  pending: function() {
    return this.get('contentType.status.hasItemsPending');
  }.property('contentType.status.hasItemsPending'),

  syncBarStyle: function() {
    return (this.get('contentType.status.percentageItemsSynced')) ? 'width: ' + this.get('contentType.status.percentageItemsSynced') + '%' : null;
  }.property('contentType.status.percentageItemsSynced'),

  syncBarClass: function() {
    return this.get('contentType.status.hasItemsPending') ? 'pending' : '';
  }.property('contentType.status.hasItemsPending')
});