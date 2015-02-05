App.Source = DS.Model.extend({
  name:                 DS.attr('string'),
  enabled:              DS.attr('boolean'),
  logoGlyphPath:        DS.attr('string'),
  contentTypes:         DS.hasMany('contentType'),
  userSourceAuths:      DS.hasMany('userSourceAuth'),

  logoGlyphUrl: function() {
    return env.ASHEVILLE_WEB_ADAPTER_HOST + this.get('logoGlyphPath');
  }.property('logoGlyphPath'),

  authed: function() {
    return (this.get('userSourceAuths.length'));
  }.property('userSourceAuths.@each')
});