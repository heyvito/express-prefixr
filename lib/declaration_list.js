(function() {
  var Declaration, DeclarationList, VendoringRules,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  VendoringRules = require('./vendoring_rules');

  Declaration = require('./declaration');

  DeclarationList = (function() {
    function DeclarationList() {
      this._list = {};
    }

    DeclarationList.prototype.addFromAst = function(astDeclarationObject) {
      var prefix, property, vendor, _i, _len, _ref;
      property = astDeclarationObject.property;
      _ref = VendoringRules.vendors;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        vendor = _ref[_i];
        prefix = "-" + vendor + "-";
        if (__indexOf.call(property, prefix) >= 0) {
          property = property.substring(prefix.length);
          break;
        }
      }
      if (__indexOf.call(Object.keys(this._list), property) < 0) {
        this._list[property] = new Declaration(property, astDeclarationObject);
      }
      return property;
    };

    DeclarationList.prototype.getList = function() {
      return this._list;
    };

    return DeclarationList;

  })();

  module.exports = DeclarationList;

}).call(this);
