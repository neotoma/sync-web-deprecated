App.User = DS.Model.extend({
  name:             DS.attr('string'),
  email:            DS.attr('string'),
  userStorageAuths: DS.hasMany('userStorageAuth'),
  userSourceAuths:  DS.hasMany('userSourceAuth'),
  sessions:         DS.hasMany('session')
});