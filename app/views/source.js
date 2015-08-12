App.SourceView = Ember.View.extend({
  tagName: 'section',
  templateName: 'source',
  classNames: ['source'],
  classNameBindings: ['connect:connect'],
  sortProperties: ['name:asc'],
  orderedContentTypes: Ember.computed.sort('source.contentTypes', 'sortProperties'),

  connect: function() {
    return !this.get('source.enabled') || !this.get('source.authed');
  }.property('source.enabled', 'source.authed'),

  actions: {
    disconnect: function() {
      if (confirm('Are you sure you want to disconnect ' + this.get('source.name') + '?')) {
        this.get('source.userSourceAuths.firstObject').destroyRecord();
      }
    }
  }
})