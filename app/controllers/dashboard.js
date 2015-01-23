App.DashboardController = Ember.ObjectController.extend({
  needs: 'session',
  sessionUser: Ember.computed.alias('controllers.session.user')
});