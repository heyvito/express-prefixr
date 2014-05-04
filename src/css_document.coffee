cssParser = require 'css-parse'
cssStringify = require 'css-stringify'
VendoringRules = require './vendoring_rules'
ParsingException = require './parsing_exception'
CSSRule = require './css_rule'

class CSSDocument
    constructor: (css)->
        @document = css
        try
            @ast = cssParser(css)
        catch ex
            throw new ParsingException(ex)
        @rules = []

    parseDocument: ()->
        for rule in @ast.stylesheet.rules
            @rules.push new CSSRule(rule)

    rebuildDocument: ()->
        @ast.stylesheet.rules = []
        for rule in @rules
            @ast.stylesheet.rules.push rule.constructASTPiece()

        @ast

    rebuildCSS: ()->
        cssStringify(@ast)

module.exports = CSSDocument
