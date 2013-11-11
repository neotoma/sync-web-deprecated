Ember.Handlebars.registerBoundHelper('pluralize', function(number, opts) {
  var single = opts.hash['s'];
  Ember.assert('pluralize requires a singular string (s)', single);
  var plural = opts.hash['p'] || single + 's';
  return (number == 1) ? single : plural;
});

Ember.Handlebars.helper('storageSize', function(storage, options) {
	var value = storage.sizes[options.hash['size']];

	if (value < 1000000000) {
		formattedValue = Math.round(value / 1000000).toLocaleString('en') + ' MB';
	} else {
		formattedValue = (value / 1000000000).toFixed(2) + ' GB';
	}

	return formattedValue;
}, 'sizes');

Ember.Handlebars.helper('storagePercentage', function(storage, options) {
	return Math.round(storage.sizes[options.hash['size']] / storage.sizes.total * 100) + '%';
}, 'sizes');

Ember.Handlebars.helper('storageTimestamp', function(storage, options) {
	var formattedTimestamp = storage.timestamps[options.hash['timestamp']];

	if (!formattedTimestamp) {
		formattedTimestamp = 'Never';
	}

	return formattedTimestamp;
}, 'timestamps');