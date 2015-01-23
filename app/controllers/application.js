App.ApplicationController = Ember.Controller.extend({
  needs: ['session'],
  sessionUser: Ember.computed.alias('controllers.session.user'),

  sessionUser: function() {
    return this.get('controllers.session.model.user');
  }.property('controllers.session.model.user')
});