App.NotificationRequest = DS.Model.extend({
  event:          DS.attr('string'),
  user:           DS.belongsTo('user'),
  storage:        DS.belongsTo('storage'),
  source:         DS.belongsTo('source')
});