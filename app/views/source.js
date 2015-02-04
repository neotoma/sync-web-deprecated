App.SourceView = Ember.View.extend({
  tagName: 'section',
  templateName: 'source',
  classNames: ['source'],
  classNameBindings: ['connect:connect'],
  sortProperties: ['name:asc'],
  orderedContentTypes: Ember.computed.sort('source.contentTypes', 'sortProperties'),

  connect: function() {
    return !this.get('source.enabled') || !this.get('source.authed');
  }.property('source.enabled', 'source.authed')
})