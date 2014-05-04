class ParsingException
    constructor: (error)->
        @name = "ParsingException"
        @message = error.message

module.exports = ParsingException