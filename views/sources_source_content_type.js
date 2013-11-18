App.SourcesSourceContentTypeView = Ember.View.extend({
	tagName: 'li',
  templateName: 'sources_source_content_type',

  isDisabled: function() {
    return (!this.get('contentType').get('connected'));
  }.property('contentType.connected')
})