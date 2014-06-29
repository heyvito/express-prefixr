DeclarationList = require './declaration_list'
DeclarationValueList = require './declaration_value_list'

class CSSRule
    constructor: (rule)->
        @originalRule = rule
        @declarations = new DeclarationList()
        @values = new DeclarationValueList()
        @comment = false
        if rule.type is 'rule'
            for rawDeclaration in rule.declarations
                current_property = @declarations.addFromAst(rawDeclaration)
                @values.addValue(current_property, rawDeclaration.value)
        else if rule.type is 'comment'
            @comment = true

    constructASTPiece: ()->
        if not @comment
            piece = {
                type: @originalRule.type,
                selectors: @originalRule.selectors.slice(),
                declarations: []
            }
            declarationList = @declarations.getList()
            for property in Object.keys(declarationList)
                if property.indexOf('$comment') is -1
                    rawDeclarationObject = declarationList[property]
                    propertyDeclarations = rawDeclarationObject.buildPrefixed()
                    propertyValues = @values.getValues(property)
                    for propertyValue in propertyValues
                        for dec in propertyValue.applyToProperties(propertyDeclarations)
                            piece.declarations.push dec
                else
                    piece.declarations.push declarationList[property].obj
        else
            piece = @originalRule

        piece

module.exports = CSSRule
