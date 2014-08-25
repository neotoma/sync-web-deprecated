App.Source = DS.Model.extend({
  name:                 DS.attr('string'),
  contentTypes:         DS.hasMany('contentType'),
  userSourceAuths:      DS.hasMany('userSourceAuth'),

  totalContentTypes: function() {
    return this.get('contentTypes.length');
	}.property('contentTypes.@each'),

  authed: function() {
    return (this.get('userSourceAuths.length'));
  }.property('userSourceAuths.@each'),

  userSourceAuth: function() {
    return this.get('userSourceAuths.firstObject');
  }.property('userSourceAuths.@each')
});