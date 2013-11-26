App.Source = DS.Model.extend({
  type:                 DS.attr('string'),
  name:                 DS.attr('string'),
  totalItemsSynced:     DS.attr('string'),
  totalItemsAvailable:  DS.attr('string'),
  lastCompletedSync:    DS.attr('date'),
  user:                 DS.belongsTo('user'),
  contentTypes:         DS.hasMany('contentType'),

  totalContentTypes: function() {
    return this.get('contentTypes').length;
	}.property('contentTypes.@each')
});