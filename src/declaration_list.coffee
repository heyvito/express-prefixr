VendoringRules = require './vendoring_rules'
Declaration = require './declaration'
Comment = require './comment'

class DeclarationList
    constructor: ()->
        @_list = {}
        @_comment = 0
    addFromAst: (astDeclarationObject) ->
        if astDeclarationObject.type is 'declaration'
            property = astDeclarationObject.property
            for vendor in VendoringRules.vendors
                prefix = "-#{vendor}-"
                if prefix in property
                    property = property.substring(prefix.length)
                    break
            if property not in Object.keys(@_list)
                @_list[property] = new Declaration(property, astDeclarationObject)
            return property
        else if astDeclarationObject.type is 'comment'
            @_list["$comment_#{@_comment}"] = new Comment(astDeclarationObject)
            @_comment++
            return 'comment'

    getList: ()->
        @_list

module.exports = DeclarationList
