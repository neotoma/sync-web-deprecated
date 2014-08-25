App.SourceMenuAuthButtonView = Ember.View.extend({
  tagName: 'button',
  templateName: 'source_menu_auth_button',
  classNameBindings: ['source.authed:authed'],

  label: function() {
    if (this.get('source.authed')) {
      return '&#10003; Connected';
    } else {
      return 'Connect';
    }
  }.property('source.authed'),

  click: function() {
    if (false && this.get('controller.isSaving')) {
      return;
    }

    if (this.get('source.authed')) {
      if (confirm('Are you sure you want to disconnect ' + this.get('source.name') + '?')) {
        this.get('source.userSourceAuth').destroyRecord();
      }
    } else {
      window.location.href = APP_CONFIG.DATA.HOST + '/sources/' + this.get('source.id') + '/auth?redirectURL=' + encodeURIComponent(window.location.href);;
    }
  }
})