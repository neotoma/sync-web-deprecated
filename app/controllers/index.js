App.IndexController = Ember.ObjectController.extend({
  needs: ['session'],
  sessionUser: Ember.computed.alias('controllers.session.user'),

  toggleDropboxUserStorageAuthClass: function() {
    return this.get('sessionUser.hasUserStorageAuth') ? 'authed' : 'unauthed';
  }.property('sessionUser.hasUserStorageAuth'),

  toggleDropboxUserStorageAuthLabel: function() {
    if (this.get('sessionUser.hasUserStorageAuth')) {
      return '&#10003; Connected';
    } else {
      return 'Connect Dropbox';
    }
  }.property('sessionUser.hasUserStorageAuth'),

  actions: {
    toggleDropboxUserStorageAuth: function() {
      if (!this.get('sessionUser.hasUserStorageAuth')) {
        this.get('controllers.session').authenticate();
      } else {
        if(confirm("Are you sure you want to disconnect Dropbox?\n\nNone of the content you've already backed up will be affected in the process, but all of your Asheville settings (such as connections to social networks and their respective content types) will be deleted permanently.")) {
          
          this.get('sessionUser.userStorageAuths').forEach(function(userStorageAuth) {
            if (userStorageAuth.get('storage') == 'dropbox') {
              console.log('delete userStorageAuth', userStorageAuth);
            }
          });
        }
      }
    }
  }
});