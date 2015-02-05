App.UserStorageAuth = DS.Model.extend({
  storage:            DS.belongsTo('storage'),
  user:               DS.belongsTo('user')
});