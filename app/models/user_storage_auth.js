App.UserStorageAuth = DS.Model.extend({
  user:               DS.belongsTo('user'),
  storage:            DS.belongsTo('storage')
});