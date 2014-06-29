(function() {
  var Comment, Declaration, DeclarationList, VendoringRules,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  VendoringRules = require('./vendoring_rules');

  Declaration = require('./declaration');

  Comment = require('./comment');

  DeclarationList = (function() {
    function DeclarationList() {
      this._list = {};
      this._comment = 0;
    }

    DeclarationList.prototype.addFromAst = function(astDeclarationObject) {
      var prefix, property, vendor, _i, _len, _ref;
      console.log(astDeclarationObject);
      if (astDeclarationObject.type === 'declaration') {
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
      } else if (astDeclarationObject.type === 'comment') {
        this._list["$comment_" + this._comment] = new Comment(astDeclarationObject);
        this._comment++;
        return 'comment';
      }
    };

    DeclarationList.prototype.getList = function() {
      return this._list;
    };

    return DeclarationList;

  })();

  module.exports = DeclarationList;

}).call(this);
