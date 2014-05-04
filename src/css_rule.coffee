DeclarationList = require './declaration_list'
DeclarationValueList = require './declaration_value_list'

class CSSRule
    constructor: (rule)->
        @originalRule = rule
        @declarations = new DeclarationList()
        @values = new DeclarationValueList()
        for rawDeclaration in rule.declarations
            current_property = @declarations.addFromAst(rawDeclaration)
            @values.addValue(current_property, rawDeclaration.value)

    constructASTPiece: ()->
        piece = {
            type: @originalRule.type,
            selectors: @originalRule.selectors.slice(),
            declarations: []
        }
        declarationList = @declarations.getList()
        for property in Object.keys(declarationList)
            rawDeclarationObject = declarationList[property]
            propertyDeclarations = rawDeclarationObject.buildPrefixed()
            propertyValues = @values.getValues(property)
            for propertyValue in propertyValues
                for dec in propertyValue.applyToProperties(propertyDeclarations)
                    piece.declarations.push dec

        piece

module.exports = CSSRule
