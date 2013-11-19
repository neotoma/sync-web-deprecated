App.IndexController = Ember.ObjectController.extend({
  isConnectingDropbox: false,

  connectDropboxLabel: function() {
    if (this.get('isConnectingDropbox')) {
      return 'Loading...';
    } else {
      return 'Connect Dropbox';
    }
  }.property('isConnectingDropbox'),

  isDisabled: function() {
    return this.get('isConnectingDropbox');
  }.property('isConnectingDropbox')
});