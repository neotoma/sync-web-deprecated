App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

var templates = [
  'application', 
  'index', 
  'sources', 
  'sync',
  'sync_storage'
];

for (var i = 0; i < templates.length; i++) {
  $.ajax({
    url: 'js/templates/' + templates[i] + '.hbs',         
    async: false,
    success: function (response) {
      Ember.TEMPLATES[templates[i]] = Ember.Handlebars.compile(response);
    }
  });
}

App.Router.map(function() {
  this.route('index', { path: '/' });
  this.route('sources', { path: '/sources' });
  this.route('sync', { path: '/sync' });
});

Ember.Object.reopen({
  /* Status Codes:
   * 1: synced
   * 2: syncing from server
   * 3: syncing to server
   * 4: sync failed
   */
  status: null,

  GET: function(url, doneCallback, failCallback) {
    target = this;
    target.set('status', 2);

    $.ajax({ url: url, dataType: 'json' }).then(

      // Done
      function(response) {
        if (doneCallback) {
          doneCallback(response);
        }

        target.set('status', 1);
      }, 

      // Fail
      function(error) {
        if (failCallback){
          failCallback(response);
        }

        target.set('status', 4);
      }
    );
  },

  POST: function(url, data, doneCallback, failCallback) {
    target = this;
    this.set('status', 3);

    $.ajax({ url: url, dataType: 'json', type: 'post', data: data }).then(
      
      // Done
      function(response) {
        if (doneCallback) {
          doneCallback(response);
        }

        target.set('status', 1);
      }, 

      // Fail
      function(error) {
        if (failCallback){
          failCallback(response);
        }

        target.set('status', 4);
      }

    );
  },

  isLoading: function() {
    return (this.get('status') == null || this.get('status') == 2);
  }.property('status'),

  isSubmitting: function() {
    return (this.get('status') == 3);
  }.property('status')
});