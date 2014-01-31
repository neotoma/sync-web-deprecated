App.IndexController = Ember.ObjectController.extend({
  needs: ['session'],

  toggleDropboxLabel: function() {
    if (this.get('hasStorage')) {
      return '&#10003; Connected';
    } else {
      return 'Connect Dropbox';
    }
  }.property('hasStorage'),

  hasStorage: function() {
    return this.get('controllers.session.user.storages.length') ? true : false;
  }.property('controllers.session.user.storages')
});