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

    $.each(this.get('source.contentTypes'), function(key, contentType) {
      if (contentType.get('isSyncing')) {
        total = total + 1;
      }
    });

    return total;
  }.property('source.contentTypes.@each.isSyncing'),

  toggleSpinner: function() {
    console.log('Total Content Types Syncing: ', this.get('totalContentTypesSyncing'));

    if (this.get('totalContentTypesSyncing') > 0) {
      var opts = {
        lines: 13, // The number of lines to draw
        length: 20, // The length of each line
        width: 10, // The line thickness
        radius: 30, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#000', // #rgb or #rrggbb or array of colors
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: 'auto', // Top position relative to parent in px
        left: 'auto' // Left position relative to parent in px
      };

      var target = document.getElementById(this.get('elementId'));
      var spinner = new Spinner(opts).spin(target);

      this.set('spinner', spinner);
    } else {
      if (this.get('spinner')) {
        this.get('spinner').stop();
      }
    }
  }.observes('totalContentTypesSyncing'),

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
  }.property('source.lastCompletedSync'),

  hasHeaderInformation: function() {
    return (this.get('hasTotalItems') || this.get('lastCompletedSync'));
  }.property('hasTotalItems', 'lastCompletedSyncTimestamp')
})