App.SourcesController = Ember.ObjectController.extend({
   isSubmitting: null,

   isDisabled: function() {
      return (!this.get('model').get('totalEnabledContentTypes') || this.get('isSubmitting'));
   }.property('totalEnabledContentTypes', 'isSubmitting'),

   saveLabel: function() {
      if (this.get('isSubmitting')) {
         return 'Loading...';
      } else {
         return 'Start Backing Them Up';
      }
   }.property('isSubmitting'),

   actions: {
      toggleConnection: function(source) {
         if (source.get('connected')) {
            if (confirm('Are you sure you want to disconnect ' + source.get('name') + '?')) {
               source.set('connected', false);
            }
         } else {
            source.set('connected', true);
         }
      },

      submit: function() {
         this.set('isSubmitting', true);
         target = this;

         App.Sources.post(
           this.get('model'), 
           function(response) {
             target.set('isSubmitting', false);
             this.transitionToRoute('sync');
           }, 
           function(reason) {
             target.set('isSubmitting', false);
           }
         );
      }
   }
});