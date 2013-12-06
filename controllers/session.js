App.SessionController = Ember.Controller.extend({
  user: null,

  authenticate: function() {
    return this.register();
  },

  deauthenticate: function() {
    this.get('user').destroyRecord();
    this.set('user', null);
  },

  register: function() {
    var controller = this;

    var user = this.store.createRecord('user', {
      id: 3,
      name: 'Saul Goodman',
      email: 'saul@bettercallsaul.com'  
    });

    return user.save().then(function(user) {
      controller.set('user', user);

      var storage = controller.store.createRecord('storage', {
        type: 'dropbox',
        name: 'Dropbox',
        totalSize: 5000000000, // 5 GB
        availableSize: 3250000000, // 2 GB
        occupiedSize: 0,
        otherSize: 1750000000, // 1.75 GB
        user: user
      });

      return storage.save().then(function(storage) {
        user.get('storages').addObject(storage);
        return user;
      });
    });
  },

  deleteUser: function() {
    this.get('user').deleteRecord();
    this.deauthenticate();
  }
});