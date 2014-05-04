(function() {
  var ParsingException;

  ParsingException = (function() {
    function ParsingException(error) {
      this.name = "ParsingException";
      this.message = error.message;
    }

    return ParsingException;

  })();

  module.exports = ParsingException;

}).call(this);
