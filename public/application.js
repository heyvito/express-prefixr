(function() {
  $(function() {
    return $('.go-button button').on('click', (function(_this) {
      return function() {
        var button;
        button = $(_this);
        button.text("Wait a second...");
        return $.ajax({
          url: '/api/processor',
          data: {
            css: $('#input').val()
          },
          type: 'POST',
          success: function(data) {
            $("#output").text(data);
            return button.text("Prefix it!");
          },
          error: function() {
            alert("Failed converting code. Try again.");
            return button.text("Prefix it!");
          }
        });
      };
    })(this));
  });

}).call(this);
