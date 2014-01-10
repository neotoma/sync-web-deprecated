String.prototype.toUnderscore = function() {
  var string = this.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();});

  if (string.indexOf('_') == 0) { 
    string = string.substr(1);
  }

  return string; 
};

Math.getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}