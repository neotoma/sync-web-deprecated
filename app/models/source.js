App.Source = DS.Model.extend({
  name:                 DS.attr('string'),
  authenticated:        DS.attr('boolean', { defaultValue: false }),
  totalItemsAvailable:  DS.attr('number'),
  totalItemsSynced:     DS.attr('number'),
  lastCompletedSync:    DS.attr('date'),
  isSyncing:            DS.attr('boolean', { defaultValue: false }),
  user:                 DS.belongsTo('user'),
  contentTypes:         DS.hasMany('contentType', { embedded: 'always' }),

  totalContentTypes: function() {
    return this.get('contentTypes').get('length');
	}.property('contentTypes.@each')
});

/**
 * See the following to learn about the below embedded records support:
 *
 * http://stackoverflow.com/questions/20823019/how-to-handle-nested-json-responses-with-ember
 */
App.SourceSerializer = DS.ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    contentTypes: { embedded: 'always' }
  }
});