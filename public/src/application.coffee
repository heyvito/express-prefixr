$ ->
  $('#input').linenumbers
    col_width: '50px'



  createMessage: (title, message)->
    div = $(document.createElement('div'))
            .addClass 'error message'
            .append("<h3>#{title}</h3>")
            .append("<p>#{message}</p>")
    $('body').append(div)
    messageHeight = div.outerHeight()
    div.css('top', "-#{messageHeight}")
    div.click(removeMessages)
    div.animate(
      top: '0',
      500
    )

  $('.go-button button').on 'click', =>
    button = $(@)
    button.text "Wait a second..."
    $.ajax
      url: '/api/processor',
      data:
        css: $('#input').val()
      dataType: 'json'
      type: 'POST'
      removeMessages: ->
        $(".message").animate
          top: -500,
          300,
          ->
            $(@).remove()
      createMessage: (title, message)->
        div = $(document.createElement('div'))
                .addClass 'error message'
                .append("<h3>#{title}</h3>")
                .append("<p>#{message}</p>")
        $('body').append(div)
        messageHeight = div.outerHeight()
        div.css('top', "-#{messageHeight}px")
        div.click(@removeMessages)
        div.animate(
          top: '0',
          300
        )
      success: (data) ->
        if data.status is 'success'
          @removeMessages()
          $("#output").text(data.result)
        else
          @removeMessages()
          @createMessage('Whoa there!', "An error ocurred while prefixing your css: #{data.result}")

        button.text "Prefix it!"
      error: ->
        @removeMessages()
        @createMessage('Oops!', 'Error prefixing your code. Try again.')
        button.text "Prefix it!"
