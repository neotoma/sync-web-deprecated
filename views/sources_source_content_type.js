App.SourcesSourceContentTypeView = Ember.View.extend({
	tagName: 'li',
  templateName: 'sources_source_content_type',

  isDisabled: function() {
    return (!this.get('contentType').get('source').get('connected'));
  }.property('contentType.source.connected')
})