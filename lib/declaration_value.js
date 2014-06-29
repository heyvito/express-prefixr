(function() {
  var DeclarationValue, VendoringRules, extend,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  VendoringRules = require('./vendoring_rules');

  extend = require('util')._extend;

  DeclarationValue = (function() {
    DeclarationValue.function_name_extractor = /([^\(]+)\(.*\)/;

    DeclarationValue.vendor_remover = /-(?:\w+)-(.*)/;

    function DeclarationValue(value) {
      var _ref, _ref1;
      this.vendors = VendoringRules.vendors;
      this.original_value = value;
      this.is_function = false;
      this.function_name = null;
      this.standard_function = null;
      this.is_vendored_function = false;
      this.is_vendored_value = false;
      if (this.constructor.function_name_extractor.test(value)) {
        this.is_function = true;
        this.function_name = this.constructor.function_name_extractor.exec(value)[1];
        if (this.constructor.vendor_remover.test(value)) {
          this.standard_function = this.constructor.vendor_remover.exec(value)[1];
          this.function_name = this.constructor.function_name_extractor.exec(this.standard_function)[1];
        }
        if (this.standard_function == null) {
          this.standard_function = value;
        }
        this.is_vendored_function = (_ref = this.function_name, __indexOf.call(VendoringRules.vendoredValues, _ref) >= 0);
      } else {
        this.is_vendored_value = (_ref1 = this.original_value, __indexOf.call(VendoringRules.vendoredValues, _ref1) >= 0);
      }
    }

    DeclarationValue.prototype.applyToProperties = function(propertyList) {
      var preResult, preResultItem, property, result, _i, _j, _len, _len1;
      result = [];
      for (_i = 0, _len = propertyList.length; _i < _len; _i++) {
        property = propertyList[_i];
        preResult = this.applyToProperty(property);
        if (Array.isArray(preResult)) {
          for (_j = 0, _len1 = preResult.length; _j < _len1; _j++) {
            preResultItem = preResult[_j];
            result.push(preResultItem);
          }
        } else {
          result.push(preResult);
        }
      }
      return result;
    };

    DeclarationValue.prototype.applyToProperty = function(property) {
      var prop, result, vendor, _i, _j, _len, _len1, _ref, _ref1;
      result = null;
      if (this.is_vendored_function) {
        result = [];
        _ref = this.vendors;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          vendor = _ref[_i];
          prop = extend({}, property);
          prop.value = "-" + vendor + "-" + this.standard_function;
          result.push(prop);
        }
        result.push((function(_this) {
          return function() {
            prop = extend({}, property);
            prop.value = "" + _this.standard_function;
            return prop;
          };
        })(this)());
      } else if (this.is_vendored_value) {
        result = [];
        _ref1 = this.vendors;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          vendor = _ref1[_j];
          prop = extend({}, property);
          prop.value = "-" + vendor + "-" + this.original_value;
          result.push(prop);
        }
        result.push((function(_this) {
          return function() {
            prop = extend({}, property);
            prop.value = "" + _this.original_value;
            return prop;
          };
        })(this)());
      } else {
        result = property;
        result.value = this.original_value;
      }
      return result;
    };

    DeclarationValue.isVendoredFunction = function(value) {
      if (this.function_name_extractor.test(value)) {
        return this.vendor_remover.test(value);
      } else {
        return __indexOf.call(VendoringRules.vendoredValues, value) >= 0;
      }
    };

    return DeclarationValue;

  })();

  module.exports = DeclarationValue;

}).call(this);
