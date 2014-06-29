App.SourceMenuView = Ember.View.extend({
  templateName: 'source_menu',
  tagName: 'tr',
  classNameBindings: ['source.connected'],

  connectLabel: function() {
    if (this.get('source.connected')) {
      return '&#10003; Connected';
    } else {
      return 'Connect';
    }
  }.property('source.connected'),

  actions: {
    toggleConnection: function() {
      if (this.get('controller.isSaving')) {
        return;
      }

      if (this.get('source.connected')) {
        if (!confirm('Are you sure you want to disconnect ' + this.get('source.name') + '?')) {
          return false;
        }
        
        this.get('source').set('connected', false);

        $.each(this.get('source.contentTypes'), function(key, contentType) {
          contentType.set('enabled', false);
        });
      } else {
        this.get('source').set('connected', true);

        $.each(this.get('source.contentTypes'), function(key, contentType) {
          contentType.set('enabled', true);
        });
      }
    }
  }
})