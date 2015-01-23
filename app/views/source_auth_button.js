App.SourceAuthButtonView = Ember.View.extend({
  tagName: 'button',
  templateName: 'source_auth_button',

  click: function() {
    window.location.href = this.get('controller.store').adapterFor('application').get('host') + '/sources/' + this.get('source.id') + '/auth?redirectURL=' + encodeURIComponent(window.location.href);
  }
})