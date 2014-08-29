App.UserStorageAuth = DS.Model.extend({
  storage:            DS.attr('string'),
  user:               DS.belongsTo('user')
});