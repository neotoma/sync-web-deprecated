App.SyncSectionView = Ember.View.extend({
  toggleSpinner: function() {
    if (this.get('isSyncing')) {
      if (!this.get('spinner')) {
        var options = { lines: 11, length: 3, width: 2, radius: 2, color: '#a7b4c1', speed: 1.5, top: '-4', left: '2' };
        var target = $('#' + this.get('elementId')).find('.sync-section-header-info-syncing');
        var spinner = new Spinner(options).spin();
        target.append(spinner.el);
        this.set('spinner', spinner);
      }
    } else if (this.get('spinner')) {
      this.get('spinner').stop();
      $(this.get('spinner').el).remove();
      this.set('spinner', null);
    }
  }.observes('isSyncing'),

  timestamp: function(value) {
    if (!value) {
      return null;
    } else if (value == 'Never') {
      return 'Never';
    }

    // add code for formatting value
  }
});