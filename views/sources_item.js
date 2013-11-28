App.SourcesItemView = Ember.View.extend({
  templateName: 'sources_item',
  tagName: 'tr',
  classNameBindings: ['item.connected'],

  connectLabel: function() {
    if (this.get('item').get('connected')) {
      return '&#10003; Connected';
    } else {
      return 'Connect';
    }
  }.property('item.connected'),

  actions: {
    toggleConnection: function() {
       if (this.get('item').get('connected')) {
          if (!confirm('Are you sure you want to disconnect ' + this.get('item').get('name') + '?')) {
            return false;
          }
          
          this.get('item').set('connected', false);

          $.each(this.get('item').get('contentTypes'), function(key, contentType) {
            contentType.set('enabled', false);
          });
       } else {
          this.get('item').set('connected', true);

          $.each(this.get('item').get('contentTypes'), function(key, contentType) {
            contentType.set('enabled', true);
          });
       }
    }
  }
})