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
    startIcons: function() {
      var spawnIcon = function() {
        var target = $('#target');

        var min_x = 1;
        var min_y = 10;
        var max_x = $('body').width();
        var max_y = target.position().top - 10;

        var left = (Math.floor(Math.random() * (max_x - min_x + 1) + min_x));
        var top = (Math.floor(Math.random() * (max_y - min_y + 1) + min_y));

        var icon = $('<div class="icon"></div>').attr({
          'left': left,
          'top': top
        });

        $('#index').append(icon);
        
        var bezier_params = {
          start: { 
            x: left, 
            y: top, 
            angle: 10
          },  
          end: { 
            x: target.position().left + target.width() / 2 - icon.width() / 2,
            y: target.position().top + target.height() / 2 - icon.height() / 2, 
            angle: -10, 
            length: 0.25
          }
        }

        icon.animate({ path : new $.path.bezier(bezier_params)}, 1000, 'swing');
        setTimeout(function() {
          icon.remove();
        }, 1100);
      }

      setInterval(spawnIcon, 1000);
    },
    toggleDropboxUserStorageAuth: function() {
      if (!this.get('sessionUser.hasUserStorageAuth')) {
        this.get('controllers.session').authenticate();
      } else {
        if(confirm("Are you sure you want to disconnect Dropbox?\n\nNone of the content you've already backed up will be affected in the process, but all of your Asheville settings (such as connections to social networks and their respective content types) will be deleted permanently.")) {
          
          this.get('sessionUser.userStorageAuths').forEach(function(userStorageAuth) {
            if (userStorageAuth.get('storage') == 'dropbox') {
              userStorageAuth.destroyRecord();
            }
          });
        }
      }
    }
  }
});