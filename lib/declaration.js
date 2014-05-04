(function() {
  var Declaration, VendoringRules,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  VendoringRules = require('./vendoring_rules');

  Declaration = (function() {
    function Declaration(property, object) {
      var vendor, _i, _len, _ref, _ref1;
      this.vendors = VendoringRules.vendors;
      this.property = null;
      _ref = this.vendors;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        vendor = _ref[_i];
        if (object.property.indexOf("-" + vendor + "-") > -1) {
          this.property = object.property.replace("-" + vendor + "-", '');
          break;
        }
      }
      if (this.property == null) {
        this.property = object.property;
      }
      this.is_vendored = (_ref1 = this.property, __indexOf.call(VendoringRules.vendoredProperties, _ref1) >= 0);
    }

    Declaration.prototype.buildPrefixed = function() {
      var declarationList, vendor, _i, _len, _ref;
      declarationList = [];
      if (this.is_vendored) {
        _ref = this.vendors;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          vendor = _ref[_i];
          declarationList.push(this._buildDeclaration(vendor));
        }
      }
      declarationList.push(this._buildDeclaration());
      return declarationList;
    };

    Declaration.prototype._buildDeclaration = function(vendor) {
      var property;
      property = this.property;
      if (vendor != null) {
        property = "-" + vendor + "-" + this.property;
      }
      return {
        type: 'declaration',
        property: property,
        value: null
      };
    };

    return Declaration;

  })();

  module.exports = Declaration;

}).call(this);
