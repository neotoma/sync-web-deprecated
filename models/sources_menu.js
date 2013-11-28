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
    var items = [];

    items.push(App.SourcesMenuItem.create(
      { 
        type: 'facebook',
        name: 'Facebook',
        contentTypes: [
          Ember.Object.create({
            type: 'status_update',
            name: 'Status Update'
          }),
          Ember.Object.create({
            type: 'link',
            name: 'Link'
          }),
          Ember.Object.create({
            type: 'check_in',
            name: 'Check-in'
          }),
          Ember.Object.create({
            type: 'photo',
            name: 'Photo'
          })
        ]
      }
    ));

    items.push(App.SourcesMenuItem.create(
      { 
        type: 'twitter',
        name: 'Twitter',
        contentTypes: [
          Ember.Object.create({
            type: 'tweet',
            name: 'Tweet'
          }),
          Ember.Object.create({
            type: 'favorite',
            name: 'Favorite'
          }),
          Ember.Object.create({
            type: 'retweet',
            name: 'Retweet'
          }),
          Ember.Object.create({
            type: 'direct_message',
            name: 'Direct Message'
          })
        ]
      }
    ));

    items.push(App.SourcesMenuItem.create(
      { 
        type: 'instagram',
        name: 'Instagram',
        contentTypes: [
          Ember.Object.create({
            type: 'photo',
            name: 'Photo'
          }),
          Ember.Object.create({
            type: 'video',
            name: 'Video'
          }),
          Ember.Object.create({
            type: 'like',
            name: 'Like'
          })
        ]
      }
    ));

    items.push(App.SourcesMenuItem.create(
      { 
        type: 'foursquare',
        name: 'Foursquare',
        contentTypes: [
          Ember.Object.create({
            type: 'check_in',
            name: 'Check-in'
          }),
          Ember.Object.create({
            type: 'tip',
            name: 'Tip'
          }),
          Ember.Object.create({
            type: 'like',
            name: 'Like'
          })
        ]
      }
    ));

    this.set('items', items);
  }
});