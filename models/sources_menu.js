App.SourcesMenu = Ember.Object.extend({
  totalConnectedSources: function() {
    var total = 0;
    $.each(this.get('items'), function(key, item) {
      if (item.get('connected')) {
        total = total + 1;
      }
    });
    return total;
  }.property('this.items.@each.connected'),

  totalEnabledContentTypes: function() {
    var total = 0;
    $.each(this.get('items'), function(key, item) {
      if (item.get('totalEnabledContentTypes')) {
        total = total + item.get('totalEnabledContentTypes');
      }
    });
    return total;
  }.property('this.items.@each.totalEnabledContentTypes'),

  init: function() {
    this._super();

    this.set('isDirty', false);

    var user = this.get('user');
    var items = [];

    items.push(App.SourcesMenuItem.create(
      { 
        type: 'facebook',
        name: 'Facebook',
        connected: user.sourceConnected('facebook'),
        contentTypes: [
          Ember.Object.create({
            type: 'status_update',
            name: 'Status Update',
            enabled: user.contentTypeEnabled('facebook', 'status_update')
          }),
          Ember.Object.create({
            type: 'link',
            name: 'Link',
            enabled: user.contentTypeEnabled('facebook', 'link')
          }),
          Ember.Object.create({
            type: 'check_in',
            name: 'Check-in',
            enabled: user.contentTypeEnabled('facebook', 'check_in')
          }),
          Ember.Object.create({
            type: 'photo',
            name: 'Photo',
            enabled: user.contentTypeEnabled('facebook', 'photo')
          })
        ]
      }
    ));

    items.push(App.SourcesMenuItem.create(
      { 
        type: 'twitter',
        name: 'Twitter',
        connected: user.sourceConnected('twitter'),
        contentTypes: [
          Ember.Object.create({
            type: 'tweet',
            name: 'Tweet',
            enabled: user.contentTypeEnabled('twitter', 'tweet')
          }),
          Ember.Object.create({
            type: 'favorite',
            name: 'Favorite',
            enabled: user.contentTypeEnabled('twitter', 'favorite')
          }),
          Ember.Object.create({
            type: 'retweet',
            name: 'Retweet',
            enabled: user.contentTypeEnabled('twitter', 'retweet')
          }),
          Ember.Object.create({
            type: 'direct_message',
            name: 'Direct Message',
            enabled: user.contentTypeEnabled('twitter', 'direct_message')
          })
        ]
      }
    ));

    items.push(App.SourcesMenuItem.create(
      { 
        type: 'instagram',
        name: 'Instagram',
        connected: user.sourceConnected('instagram'),
        contentTypes: [
          Ember.Object.create({
            type: 'photo',
            name: 'Photo',
            enabled: user.contentTypeEnabled('instagram', 'photo')
          }),
          Ember.Object.create({
            type: 'video',
            name: 'Video',
            enabled: user.contentTypeEnabled('instagram', 'video')
          }),
          Ember.Object.create({
            type: 'like',
            name: 'Like',
            enabled: user.contentTypeEnabled('instagram', 'like')
          })
        ]
      }
    ));

    items.push(App.SourcesMenuItem.create(
      { 
        type: 'foursquare',
        name: 'Foursquare',
        connected: user.sourceConnected('foursquare'),
        contentTypes: [
          Ember.Object.create({
            type: 'check_in',
            name: 'Check-in',
            enabled: user.contentTypeEnabled('foursquare', 'check_in')
          }),
          Ember.Object.create({
            type: 'tip',
            name: 'Tip',
            enabled: user.contentTypeEnabled('foursquare', 'tip')
          }),
          Ember.Object.create({
            type: 'like',
            name: 'Like',
            enabled: user.contentTypeEnabled('foursquare', 'like')
          })
        ]
      }
    ));

    this.set('items', items);
  }
});