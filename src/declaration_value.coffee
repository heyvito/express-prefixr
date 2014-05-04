VendoringRules = require './vendoring_rules'
extend = require('util')._extend


class DeclarationValue
    @function_name_extractor: /([^\(]+)\(.*\)/
    @vendor_remover: /-(?:\w+)-(.*)/

    constructor: (value)->
        @vendors = VendoringRules.vendors
        @original_value = value
        @is_function = false
        @function_name = null
        @standard_function = null
        @is_vendored_function = false

        if @constructor.function_name_extractor.test value
            @is_function = true
            @function_name = @constructor.function_name_extractor.exec(value)[1]
            if @constructor.vendor_remover.test value
                @standard_function = @constructor.vendor_remover.exec(value)[1]
                @function_name = @constructor.function_name_extractor.exec(@standard_function)[1]

            if not @standard_function?
                @standard_function = value
            @is_vendored_function = @function_name in VendoringRules.vendoredValues

    applyToProperties: (propertyList)->
        result = []
        for property in propertyList
            preResult = @applyToProperty(property)
            if Array.isArray preResult
                for preResultItem in preResult
                    result.push preResultItem
            else
                result.push preResult
        result

    applyToProperty: (property)->
        result = null
        if @is_vendored_function
            result = []
            for vendor in @vendors
                prop = extend({}, property)
                prop.value = "-#{vendor}-#{@standard_function}"
                result.push prop
            result.push do =>
                prop = extend({}, property)
                prop.value = "#{@standard_function}"
                prop
        else
            result = property
            result.value = @original_value
        result

    @isVendoredFunction: (value)->
        if @function_name_extractor.test value
            @vendor_remover.test value
        else
            false


module.exports = DeclarationValue
