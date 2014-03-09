propertyPrefixr = require './property-prefixr'
valuePrefixr = require './value-prefixr'

vendors = [ '-webkit-', '-moz-', '-ms-', '-o-' ]

module.exports = (css) =>
  css = propertyPrefixr vendors, css
  css = valuePrefixr vendors, css
  css
