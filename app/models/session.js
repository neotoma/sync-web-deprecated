App.Session = DS.Model.extend({
  users: DS.hasMany('user', { embedded: 'always' }),

  user: function() {
    return this.get('users.firstObject');
  }.property('this.users.@each')
});

/**
 * See the following to learn about the below embedded records support:
 *
 * http://stackoverflow.com/questions/20823019/how-to-handle-nested-json-responses-with-ember
 */
App.SessionSerializer = DS.ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    users: { embedded: 'always' }
  }
});