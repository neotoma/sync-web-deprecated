App.DashboardRoute = App.AuthenticatedRoute.extend({
  model: function() {
    return Ember.RSVP.hash({
      sources: this.store.find('source'),
      statuses: this.store.find('status')
    });
  },

  setupController: function(controller, model) {
    // Associated statuses with relevant content types
    model.statuses.forEach(function(status) {
      model.sources.forEach(function(source) {
        source.get('contentTypes').forEach(function(contentType) {
          if (status.get('source') == source && status.get('contentType') == contentType) {
            contentType.set('status', status);
            return;
          }
        });
      });
    });

    controller.set('model', model);

    var store = this.store;
    socket.on('statusesUpdate', function(data) {
      store.pushPayload('status', data);
    });
  }
});