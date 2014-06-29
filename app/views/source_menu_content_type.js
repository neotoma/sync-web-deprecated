App.SourceMenuContentTypeView = Ember.View.extend({
	tagName: 'li',
  templateName: 'source_menu_content_type',

  isDisabled: function() {
    return (!this.get('source.connected'));
  }.property('source.connected'),

  change: function() {
    this.get('controller.model').set('isDirty', true);
  }
})