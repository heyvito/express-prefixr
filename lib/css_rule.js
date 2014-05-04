(function() {
  var CSSRule, DeclarationList, DeclarationValueList;

  DeclarationList = require('./declaration_list');

  DeclarationValueList = require('./declaration_Value_list');

  CSSRule = (function() {
    function CSSRule(rule) {
      var current_property, rawDeclaration, _i, _len, _ref;
      this.originalRule = rule;
      this.declarations = new DeclarationList();
      this.values = new DeclarationValueList();
      _ref = rule.declarations;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        rawDeclaration = _ref[_i];
        current_property = this.declarations.addFromAst(rawDeclaration);
        this.values.addValue(current_property, rawDeclaration.value);
      }
    }

    CSSRule.prototype.constructASTPiece = function() {
      var dec, declarationList, piece, property, propertyDeclarations, propertyValue, propertyValues, rawDeclarationObject, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
      piece = {
        type: this.originalRule.type,
        selectors: this.originalRule.selectors.slice(),
        declarations: []
      };
      declarationList = this.declarations.getList();
      _ref = Object.keys(declarationList);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        property = _ref[_i];
        rawDeclarationObject = declarationList[property];
        propertyDeclarations = rawDeclarationObject.buildPrefixed();
        propertyValues = this.values.getValues(property);
        for (_j = 0, _len1 = propertyValues.length; _j < _len1; _j++) {
          propertyValue = propertyValues[_j];
          _ref1 = propertyValue.applyToProperties(propertyDeclarations);
          for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
            dec = _ref1[_k];
            piece.declarations.push(dec);
          }
        }
      }
      return piece;
    };

    return CSSRule;

  })();

  module.exports = CSSRule;

}).call(this);
