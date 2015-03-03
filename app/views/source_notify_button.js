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

      notificationRequest.save().then(function(notificationRequest) {
        source.set('notificationRequest', notificationRequest);
      });
    } else {
      source.get('notificationRequest').destroyRecord().then(function() {
        source.set('notificationRequest', null);
      });
    }
  }
})