App.Session = DS.Model.extend({
  users: DS.hasMany('user', { embedded: 'always' }),

  user: function() {
    return this.get('users.firstObject');
  }.property('this.users.@each')
});

/**
 * See the following to learn about the below embedded records support:
 *
 * https://github.com/emberjs/data/issues/1757
 * http://stackoverflow.com/questions/20823019/how-to-handle-nested-json-responses-with-ember
 */

App.ApplicationSerializer = DS.ActiveModelSerializer.extend({
  primaryKey: '_id'
});

App.SessionSerializer = DS.ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    users: { embedded: 'always' }
  }
});