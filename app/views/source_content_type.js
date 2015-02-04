App.SourceContentTypeView = Ember.View.extend({
  templateName: 'source_content_type',
  classNames: ['content-type'],
  classNameBindings: ['pending:pending'],

  pending: function() {
    return this.get('contentType.status.hasItemsPending');
  }.property('contentType.status.hasItemsPending'),

  syncBarStyle: function() {
    var percentage = 0;

    if (this.get('contentType.status.totalItemsSynced')) {
      percentage = Math.floor(this.get('contentType.status.totalItemsSynced') / this.get('contentType.status.totalItemsAvailable') * 100);
    }
    
    return 'width: ' + percentage + '%';
  }.property('contentType.status.totalItemsSynced', 'contentType.status.totalItemsAvailable'),

  totalItemsSynced: function() {
    if (this.get('contentType.status.totalItemsSynced') >= 0) {
      return this.get('contentType.status.totalItemsSynced');
    } else {
      return 0;
    }
  }.property('contentType.status.totalItemsSynced'),

  totalItemsAvailable: function() {
    if (this.get('contentType.status.totalItemsAvailable') >= 0) {
      return this.get('contentType.status.totalItemsAvailable');
    } else {
      return 0;
    }
  }.property('contentType.status.totalItemsAvailable'),

  totalItemsSyncedPercentage: function() {
    if (this.get('contentType.status.totalItemsSynced') && this.get('contentType.status.totalItemsAvailable')) {
      return this.get('contentType.percentageItemsSynced') + '%';
    } else {
      return '0%';
    }
  }.property('contentType.status.totalItemsSynced', 'contentType.status.totalItemsAvailable')
});