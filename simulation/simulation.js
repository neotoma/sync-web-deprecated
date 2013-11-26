App.Simulation = Ember.Object.extend();

App.ApplicationAdapter.reopen({
  createRecord: function(store, type, record) {
    var serializer = store.serializerFor(type.typeKey);
    var json = serializer.serialize(record, { includeId: true });
    console.log('createRecord: ' + type);
    console.log(json);

    return this._super(store, type, record);
  },

  updateRecord: function(store, type, record) {
    console.log('updateRecord');
    return this._super(store, type, record);
  },
});