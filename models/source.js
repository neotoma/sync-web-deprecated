App.Source = DS.Model.extend({
  type:                 DS.attr('string'),
  name:                 DS.attr('string'),
  totalItemsSynced:     DS.attr('string'),
  totalItemsAvailable:  DS.attr('string'),
  lastCompletedSync:    DS.attr('date'),
  user:                 DS.belongsTo('user'),
  contentTypes:         DS.hasMany('contentType', { async: true }),

  totalContentTypes: function() {
    return this.get('contentTypes').get('length');
	}.property('contentTypes.@each')
});

if (APP_CONFIG.DATA.FIXTURES_ENABLED.SOURCES) {
  App.Source.FIXTURES = [
    {
      id: 4,
      name: 'facebook',
      type: 'Facebook',
      user: 3
    },
    {
      id: 5,
      name: 'instagram',
      type: 'Instagram',
      user: 3
    }
  ];

  if (APP_CONFIG.DATA.FIXTURES_ENABLED.CONTENT_TYPES) {
    App.Source.FIXTURES[0].contentTypes = [10,11,12];
  }
} else {
  App.Source.FIXTURES = [];
}