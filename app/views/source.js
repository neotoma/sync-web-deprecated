App.SourceView = Ember.View.extend({
  tagName: 'section',
  templateName: 'source',
  classNames: ['source'],
  classNameBindings: ['connect:connect'],

  connect: function() {
    return !this.get('source.enabled') || !this.get('source.authed');
  }.property('source.enabled', 'source.authed')
})