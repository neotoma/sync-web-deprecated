App.SourcesSourceView = Ember.View.extend({
  templateName: 'sources_source',

  connectLabel: function() {
    if (this.get('source').get('connected')) {
      return '&#10003; Connected';
    } else {
      return 'Connected';
    }
  }.property('source.connected'),

  actions: {
    toggleConnection: function() {
       if (this.get('source').get('connected')) {
          if (!confirm('Are you sure you want to disconnect ' + this.get('source').get('name') + '?')) {
            return false;
          }
          
          this.get('source').set('connected', false);

          $.each(this.get('source').get('contentTypes'), function(key, contentType) {
            contentType.set('enabled', false);
          });
       } else {
          this.get('source').set('connected', true);

          $.each(this.get('source').get('contentTypes'), function(key, contentType) {
            contentType.set('enabled', true);
          });
       }
    }
  }
})