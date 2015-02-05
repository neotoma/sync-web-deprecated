App.Storage = DS.Model.extend({
  userStorageAuths: DS.hasMany('userStorageAuth')
});