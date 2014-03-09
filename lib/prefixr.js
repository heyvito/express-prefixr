(function() {
  var propertyPrefixr, valuePrefixr, vendors;

  propertyPrefixr = require('./property-prefixr');

  valuePrefixr = require('./value-prefixr');

  vendors = ['-webkit-', '-moz-', '-ms-', '-o-'];

  module.exports = (function(_this) {
    return function(css) {
      css = propertyPrefixr(vendors, css);
      css = valuePrefixr(vendors, css);
      return css;
    };
  })(this);

}).call(this);
