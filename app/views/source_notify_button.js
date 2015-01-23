App.SourceNotifyButtonView = Ember.View.extend({
  tagName: 'button',
  templateName: 'source_notify_button',

  click: function() {
    console.log('handle notify me submission');
  }
})