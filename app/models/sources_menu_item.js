App.SourcesMenuItem = Ember.Object.extend({
  totalEnabledContentTypes: function() {
    var total = 0;
    $.each(this.get('contentTypes'), function(key, contentType) {
      if (contentType.get('enabled')) {
        total = total + 1;
      }
    });
    return total;
  }.property('this.contentTypes.@each.enabled'),
});