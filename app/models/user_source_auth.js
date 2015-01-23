App.UserSourceAuth = DS.Model.extend({
  user:               DS.belongsTo('user'),
  source:             DS.belongsTo('source'),
  sourceToken:        DS.attr('string'),
  sourceUser:         DS.attr('number')
});