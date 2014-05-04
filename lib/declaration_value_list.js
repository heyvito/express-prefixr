(function() {
  var DeclarationValue, DeclarationValueList;

  DeclarationValue = require('./declaration_value');

  DeclarationValueList = (function() {
    DeclarationValueList.prototype.propertyComparator = function(property) {
      return function(i) {
        return i.property === property;
      };
    };

    function DeclarationValueList() {
      this.values = [];
    }

    DeclarationValueList.prototype.addValue = function(property, value) {
      var existing_value, ignore, value_is_vendored, _i, _len, _ref;
      ignore = false;
      if (this.hasValue(property)) {
        value_is_vendored = DeclarationValue.isVendoredFunction(value);
        _ref = this.values.filter(this.propertyComparator(property));
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          existing_value = _ref[_i];
          if (existing_value.is_vendored && value_is_vendored) {
            ignore = true;
            break;
          }
        }
      }
      if (!ignore) {
        return this.values.push({
          property: property,
          value: new DeclarationValue(value)
        });
      }
    };

    DeclarationValueList.prototype.hasValue = function(property) {
      return this.values.some(this.propertyComparator(property));
    };

    DeclarationValueList.prototype.getValues = function(property) {
      if (!this.hasValue(property)) {
        return null;
      } else {
        return this.values.filter(this.propertyComparator(property)).map(function(i) {
          return i.value;
        });
      }
    };

    return DeclarationValueList;

  })();

  module.exports = DeclarationValueList;

}).call(this);
