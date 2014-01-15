App.SyncSourceView = Ember.View.extend({
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

  hasContentTypesSyncing: function() {
    return (this.get('totalContentTypesSyncing') > 0);
  }.property('totalContentTypesSyncing'),

  headerInfoSyncingStyle: function() {
    return (this.get('hasContentTypesSyncing')) ? 'display: inline-block' : 'display: none';
  }.property('hasContentTypesSyncing'),

  toggleSpinner: function() {
    if (this.get('hasContentTypesSyncing')) {
      if (!this.get('spinner')) {
        var opts = {
          lines: 11,
          length: 3,
          width: 2,
          radius: 2,
          color: '#a7b4c1',
          speed: 1.5,
          top: '-4',
          left: '-25'
        };

        var target = $('#' + this.get('elementId')).find('.header_info_syncing');
        var spinner = new Spinner(opts).spin();
        target.append(spinner.el);

        this.set('spinner', spinner);
      }
    } else if (this.get('spinner')) {
      this.get('spinner').stop();
    }
  }.observes('hasContentTypesSyncing'),

  timestamp: function(value) {
    if (!value) {
      return null;
    } else if (value == 'Never') {
      return 'Never';
    }

    // add code for formatting value
  },

  lastCompletedSyncTimestamp: function() {
    return this.timestamp(this.get('source.lastCompletedSync'));
  }.property('source.lastCompletedSync')
})