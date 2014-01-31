Ember.Handlebars.registerBoundHelper('conditionalPluralize', function(number, opts) {
  var single = opts.hash['s'];
  Ember.assert('pluralize requires a singular string (s)', single);
  var plural = opts.hash['p'] || single + 's';
  return (number == 1) ? single : plural;
});

Ember.Handlebars.registerBoundHelper('pluralize', function(string, opts) {
  return string + 's';
});

Swag.registerHelpers(Ember.Handlebars);