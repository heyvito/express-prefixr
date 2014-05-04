(function() {
  $(function() {
    $('#input').linenumbers({
      col_width: '50px'
    });
    ({
      createMessage: function(title, message) {
        var div, messageHeight;
        div = $(document.createElement('div')).addClass('error message').append("<h3>" + title + "</h3>").append("<p>" + message + "</p>");
        $('body').append(div);
        messageHeight = div.outerHeight();
        div.css('top', "-" + messageHeight);
        div.click(removeMessages);
        return div.animate({
          top: '0'
        }, 500);
      }
    });
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
          dataType: 'json',
          type: 'POST',
          removeMessages: function() {
            return $(".message").animate({
              top: -500
            }, 300, function() {
              return $(this).remove();
            });
          },
          createMessage: function(title, message) {
            var div, messageHeight;
            div = $(document.createElement('div')).addClass('error message').append("<h3>" + title + "</h3>").append("<p>" + message + "</p>");
            $('body').append(div);
            messageHeight = div.outerHeight();
            div.css('top', "-" + messageHeight + "px");
            div.click(this.removeMessages);
            return div.animate({
              top: '0'
            }, 300);
          },
          success: function(data) {
            if (data.status === 'success') {
              this.removeMessages();
              $("#output").text(data.result);
            } else {
              this.removeMessages();
              this.createMessage('Whoa there!', "An error ocurred while prefixing your css: " + data.result);
            }
            return button.text("Prefix it!");
          },
          error: function() {
            this.removeMessages();
            this.createMessage('Oops!', 'Error prefixing your code. Try again.');
            return button.text("Prefix it!");
          }
        });
      };
    })(this));
  });

}).call(this);
