DeclarationValue = require './declaration_value'

class DeclarationValueList
    propertyComparator: (property)-> (i)-> i.property is property

    constructor: ()->
        @values = []

    addValue: (property, value)->
        ignore = false
        if @hasValue property
            value_is_vendored = DeclarationValue.isVendoredFunction(value)
            for existing_value in @values.filter(@propertyComparator property)
                if existing_value.is_vendored && value_is_vendored
                    ignore = true
                    break
        unless ignore
            @values.push
                property: property
                value: new DeclarationValue(value)

    hasValue: (property) ->
        @values.some(@propertyComparator property)

    getValues: (property) ->
        unless @hasValue(property)
            null
        else
            @values
                .filter @propertyComparator(property)
                .map (i)-> i.value

module.exports = DeclarationValueList
