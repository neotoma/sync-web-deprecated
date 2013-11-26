/* Sources and related content types supported by application */

var APP_SOURCES = [
  { 
    type: 'facebook',
    name: 'Facebook',
    contentTypes: [
      {
        type:       'status_update',
        name:       'Status Update'
      },
      {
        type:       'link',
        name:       'Link'
      },
      {
        type:       'check_in',
        name:       'Check-in'
      },
      {
        type:       'photo',
        name:       'Photo'
      }
    ]
  },
  { 
    type: 'twitter',
    name: 'Twitter'
    contentTypes: [
      {
        type:       'tweet',
        name:       'Tweet'
      },
      {
        type:       'favorite',
        name:       'Favorite'
      },
      {
        type:       'retweet',
        name:       'Retweet'
      },
      {
        type:       'direct_message',
        name:       'Direct Message'
      }
    ]
  },
  { 
    type: 'instagram',
    name: 'Instagram'
    contentTypes: [
      {
        type:       'photo',
        name:       'Photo'
      },
      {
        type:       'video',
        name:       'Videos'
      },
      {
        type:       'like',
        name:       'Like'
      }
    ]
  },
  { 
    type: 'foursquare',
    name: 'Foursquare',
    contentTypes: [
      {
        type:       'check_in',
        name:       'Check-in'
      },
      {
        type:       'tip',
        name:       'Tip'
      },
      {
        type:       'like',
        name:       'Like'
      }
    ]
  }
]