App.ContentType = DS.Model.extend({
  name:     DS.attr('string'),
  sources:  DS.hasMany('source')
});