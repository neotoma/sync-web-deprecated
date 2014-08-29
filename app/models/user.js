App.User = DS.Model.extend({
  name:             DS.attr('string'),
  email:            DS.attr('string'),
  userStorageAuths: DS.hasMany('userStorageAuth'),
  userSourceAuths:  DS.hasMany('userSourceAuth'),
  sessions:         DS.hasMany('session'),

	hasUserStorageAuth: function() {
		return this.get('userStorageAuths.length') ? true : false;
	}.property('userStorageAuths.@each'),

  hasUserSourceAuth: function() {
    return this.get('userSourceAuths.length') ? true : false;
  }.property('userSourceAuths.@each')
});