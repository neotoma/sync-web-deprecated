App.ContentType = DS.Model.extend({
  type:     DS.attr('string'),
  name:     DS.attr('string'),
  source:   DS.belongsTo('source')
});