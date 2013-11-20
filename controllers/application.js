App.ApplicationController = Ember.Controller.extend({
  authenticateUser: function() {
    App.SimulatedServer.set('user', { 
      'ID': 1,
      'email': 'example@example.org',
      'name': 'Saul Goodman',
      'storages': [
        {
          ID: 'dropbox',
          name: 'Dropbox',
          connected: false,
          sizes: {
            total: 5000000000, // 5 GB
            available: 2000000000, // 2 GB
            occupied: 1250000000, // 1.25 GB
            other: 1750000000 // 1.75 GB
          },
          timestamps: {
            lastCompletedSync: 'Never'
          }
        }
      ]
    });

    this.set('model', App.User.create(App.SimulatedServer.get('user')));
  },

  deauthenticateUser: function() {
    App.SimulatedServer.set('user', App.User.create());
    this.set('model', App.User.create(App.SimulatedServer.get('user')));
  },

  handleTransitionStart: function() {
    this.startLoadingIndicator();
  },

  handleTransitionStop: function() {
    this.stopLoadingIndicator();
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

  startLoadingIndicator: function() {
    $('#app-loading-indicator').show(500);
  },

  stopLoadingIndicator: function() {
    $('#app-loading-indicator').hide(500);
  }
});