App.UserSourceAuth = DS.Model.extend({
  user:               DS.belongsTo('user'),
  source:             DS.belongsTo('source'),
  source_token:       DS.attr('string'),
  source_user_id:     DS.attr('number')
});