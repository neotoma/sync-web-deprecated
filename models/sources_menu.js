App.SourcesMenu = Ember.Object.extend({
  init: function() {
    var items = [];

    items.push(App.SourcesMenuItem.create(
      { 
        type: 'facebook',
        name: 'Facebook',
        contentTypes: [
          {
            type: 'status_update',
            name: 'Status Update'
          },
          {
            type: 'link',
            name: 'Link'
          },
          {
            type: 'check_in',
            name: 'Check-in'
          },
          {
            type: 'photo',
            name: 'Photo'
          }
        ]
      }
    ));

    items.push(App.SourcesMenuItem.create(
      { 
        type: 'twitter',
        name: 'Twitter',
        contentTypes: [
          {
            type: 'tweet',
            name: 'Tweet'
          },
          {
            type: 'favorite',
            name: 'Favorite'
          },
          {
            type: 'retweet',
            name: 'Retweet'
          },
          {
            type: 'direct_message',
            name: 'Direct Message'
          }
        ]
      }
    ));

    items.push(App.SourcesMenuItem.create(
      { 
        type: 'instagram',
        name: 'Instagram',
        contentTypes: [
          {
            type: 'photo',
            name: 'Photo'
          },
          {
            type: 'video',
            name: 'Video'
          },
          {
            type: 'like',
            name: 'Like'
          }
        ]
      }
    ));

    items.push(App.SourcesMenuItem.create(
      { 
        type: 'foursquare',
        name: 'Foursquare',
        contentTypes: [
          {
            type: 'check_in',
            name: 'Check-in'
          },
          {
            type: 'tip',
            name: 'Tip'
          },
          {
            type: 'like',
            name: 'Like'
          }
        ]
      }
    ));

    this.set('items', items);
  }
});