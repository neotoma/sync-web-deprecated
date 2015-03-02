App.Item = DS.Model.extend({
  sourceItem:           DS.attr('string'),
  syncAttemptedAt:      DS.attr('date'),
  syncVerifiedAt:       DS.attr('date'),
  syncFailedAt:         DS.attr('date'),
  bytes:                DS.attr('number'),
  path:                 DS.attr('string'),
  description:          DS.attr('string'),
  error:                DS.attr('string'),
  storage:              DS.attr('string'),
  user:                 DS.belongsTo('user'),
  source:               DS.belongsTo('source'),
  contentType:          DS.belongsTo('contentType'),
  status:               DS.hasMany('status')
});