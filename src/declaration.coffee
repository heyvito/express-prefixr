VendoringRules = require './vendoring_rules'

class Declaration
    constructor: (property, object) ->
        @vendors = VendoringRules.vendors
        @property = null
        for vendor in @vendors
            if object.property.indexOf("-#{vendor}-") > -1
                @property = object.property.replace("-#{vendor}-", '')
                break
        unless @property?
            @property = object.property
        @is_vendored = @property in VendoringRules.vendoredProperties

    buildPrefixed: ()->
        declarationList = []
        if @is_vendored
            for vendor in @vendors
                declarationList.push @_buildDeclaration(vendor)
        declarationList.push @_buildDeclaration()
        declarationList

    _buildDeclaration: (vendor)->
        property = @property
        if vendor?
            property = "-#{vendor}-#{@property}"
        type: 'declaration'
        property: property
        value: null

module.exports = Declaration
