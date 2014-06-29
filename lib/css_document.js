(function() {
  var CSSDocument, CSSRule, ParsingException, VendoringRules, cssParser, cssStringify;

  cssParser = require('css-parse');

  cssStringify = require('css-stringify');

  VendoringRules = require('./vendoring_rules');

  ParsingException = require('./parsing_exception');

  CSSRule = require('./css_rule');

  CSSDocument = (function() {
    function CSSDocument(css) {
      var ex;
      this.document = css;
      try {
        this.ast = cssParser(css);
      } catch (_error) {
        ex = _error;
        throw new ParsingException(ex);
      }
      this.rules = [];
    }

    CSSDocument.prototype.parseDocument = function() {
      var rule, _i, _len, _ref, _results;
      console.log('rules following');
      console.log(this.ast.stylesheet.rules);
      _ref = this.ast.stylesheet.rules;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        rule = _ref[_i];
        _results.push(this.rules.push(new CSSRule(rule)));
      }
      return _results;
    };

    CSSDocument.prototype.rebuildDocument = function() {
      var rule, _i, _len, _ref;
      this.ast.stylesheet.rules = [];
      _ref = this.rules;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        rule = _ref[_i];
        console.log('process rule');
        console.log(rule);
        console.log(rule.constructASTPiece());
        this.ast.stylesheet.rules.push(rule.constructASTPiece());
      }
      return this.ast;
    };

    CSSDocument.prototype.rebuildCSS = function() {
      return cssStringify(this.ast);
    };

    return CSSDocument;

  })();

  module.exports = CSSDocument;

}).call(this);
