App.SourcesItemContentTypeView = Ember.View.extend({
	tagName: 'li',
  templateName: 'sources_item_content_type',

  isDisabled: function() {
    return (!this.get('item.connected'));
  }.property('item.connected')
})