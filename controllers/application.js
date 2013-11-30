App.ApplicationController = Ember.Controller.extend({
  sessionUser: Ember.computed.alias('model'),

  registerUser: function() {
    var controller = this;

    var user = this.store.createRecord('user', {
      id: 3,
      name: 'Saul Goodman',
      email: 'saul@bettercallsaul.com'  
    });

    return user.save().then(function(user) {
      controller.set('model', user);

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
      });
    });
  },

  authenticateUser: function() {
    return this.registerUser();
  },

  deauthenticateUser: function() {
    this.set('sessionUser', null);
  },

  indexSelected: function() {
    return this.isSelected('index');
  }.property('currentPath', 'targetPath'),

  sourcesSelected: function() {
    return this.isSelected('sources');
  }.property('currentPath', 'targetPath'),

  syncSelected: function() {
    return this.isSelected('sync');
  }.property('currentPath', 'targetPath'),

  isSelected: function(path) {
    return this.get('currentPath') == path || this.get('targetPath') == path;
  },

  handleTransitionStart: function() {
    this.startLoadingIndicator();
  },

  handleTransitionStop: function() {
    this.stopLoadingIndicator();
  },

  startLoadingIndicator: function() {
    $('#app-loading-indicator').show(500);
  },

  stopLoadingIndicator: function() {
    $('#app-loading-indicator').hide(500);
  }
});