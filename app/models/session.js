App.Session = DS.Model.extend({
  users: DS.hasMany('user'),

  user: function() {
    return this.get('users.firstObject');
  }.property('this.users.@each')
});