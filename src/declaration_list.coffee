VendoringRules = require './vendoring_rules'
Declaration = require './declaration'

class DeclarationList
    constructor: ()->
        @_list = {}
    addFromAst: (astDeclarationObject) ->
        property = astDeclarationObject.property
        for vendor in VendoringRules.vendors
            prefix = "-#{vendor}-"
            if prefix in property
                property = property.substring(prefix.length)
                break
        if property not in Object.keys(@_list)
            @_list[property] = new Declaration(property, astDeclarationObject)
        return property

    getList: ()->
        @_list

module.exports = DeclarationList
