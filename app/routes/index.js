App.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    if (this.controllerFor('index').get('sessionUser.hasUserStorageAuth')) {
      this.transitionTo('sources');
    }
  },
  model: function() {
    var store = this.store;
    return this.store.find('storageSurvey').then(function(storageSurveys) {
      if (Ember.isEmpty(storageSurveys)) {
        return store.createRecord('storageSurvey');
      } else {
        return storageSurveys.get('firstObject');
      }
    });
  },
  afterModel: function(model, transition) {
    transition.then(function() {
      var spawnIcon = function() {
        var container = $('.ember-view');
        var target = $('#icon-target');

        var min_x = 10;
        var min_y = 10;
        var max_x = container.width() - 10;
        var max_y = target.offset().top - 100;

        var left = (Math.floor(Math.random() * (max_x - min_x + 1) + min_x));
        var top = (Math.floor(Math.random() * (max_y - min_y + 1) + min_y));
        var icon_names = ['photo', 'checkin', 'message', 'transaction', 'update', 'video'];

        var icon = $('<div class="icon"><img src="/images/icons/' + icon_names[Math.floor(Math.random() * (icon_names.length - 0) + 0)] + '.svg" /></div>').css({
          'left': left,
          'top': top
        });

        container.append(icon);
        
        var bezier_params = {
          start: { 
            x: left, 
            y: top, 
            angle: 10
          },  
          end: { 
            x: target.offset().left + target.width() / 2 - icon.width() / 2,
            y: target.offset().top + target.height() / 2 - icon.height() / 2, 
            angle: -10, 
            length: 0.25
          }
        }

        icon.animate({ path : new $.path.bezier(bezier_params)}, 2000);
        setTimeout(function() {
          icon.remove();
        }, 2000);
      }

      setInterval(spawnIcon, 700);
    });
  }
});