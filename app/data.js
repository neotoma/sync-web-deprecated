$.ajaxSetup({
  xhrFields: {
    withCredentials: true
  }
});

App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: APP_CONFIG.DATA.HOST,
  namespace: APP_CONFIG.DATA.NAMESPACE
});

/* Ember Data bug fix to enable successful saving of one-to-many relationships. 
 *
 * See: http://stackoverflow.com/questions/19093078/ember-data-saving-record-loses-has-many-relationships 
 */
DS.JSONSerializer.reopen({
  serializeHasMany : function(record, json, relationship) {
    var key = relationship.key;
    var relationshipType = DS.RelationshipChange.determineRelationshipType(record.constructor, relationship);

    if (relationshipType === 'manyToNone'
      || relationshipType === 'manyToMany'
      || relationshipType === 'manyToOne') {
      json[key] = Ember.get(record, key).mapBy('id');
    }
  }
});