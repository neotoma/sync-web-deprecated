Ember.Handlebars.registerBoundHelper('pluralize', function(number, opts) {
  var single = opts.hash['s'];
  Ember.assert('pluralize requires a singular string (s)', single);
  var plural = opts.hash['p'] || single + 's';
  return (number == 1) ? single : plural;
});