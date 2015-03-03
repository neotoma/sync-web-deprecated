App.SourceNotifyButtonView = Ember.View.extend({
  tagName: 'button',
  templateName: 'source_notify_button',
  classNameBindings: ['requested:enabled'],

  requested: function() {
    return (this.get('source.notificationRequest'));
  }.property('source.notificationRequest'),

  click: function() {
    var source = this.get('source');

    if (!this.get('requested')) {
      var store = this.get('controller').get('store');

      var notificationRequest = store.createRecord('notificationRequest', {
        user: this.get('controller.sessionUser'),
        source: source,
        event: 'source-support'
      });

      source.set('notificationRequest', notificationRequest);

      notificationRequest.save();
    } else if(!this.get('source.notificationRequest.isSaving')) {
      source.get('notificationRequest').destroyRecord();
      source.set('notificationRequest', null);
    }
  }
})