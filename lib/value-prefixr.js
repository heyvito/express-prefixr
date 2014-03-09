(function() {
  var vendoredValues;

  vendoredValues = ['linear-gradient', 'radial-gradient', 'repeating-linear-gradient', 'repeating-radial-gradient'];

  module.exports = function(vendors, css) {
    vendoredValues.forEach(function(func) {
      var regex;
      regex = new RegExp("(?:;*)([ \s\t]*)?([a-z1-9-]+)[ \s\t]*:[ \s\t]*" + func + "([^\n;}]+);?", 'ig');
      return css = css.replace(regex, function(match, spaces, prop, value) {
        var result;
        spaces = spaces || '';
        result = spaces + match.replace("\n", '').trim() + "\n";
        value = value.replace("\n", '').trim();
        vendors.forEach(function(vendor) {
          return result += "" + spaces + prop + ": " + vendor + func + value + ";\n";
        });
        return result;
      });
    });
    return css;
  };

}).call(this);
