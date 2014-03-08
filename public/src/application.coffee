$ ->
  $('.go-button button').on 'click', =>
    button = $(@)
    button.text "Wait a second..."
    $.ajax
      url: '/api/processor',
      data:
        css: $('#input').val()
      type: 'POST'
      success: (data) ->
        $("#output").text(data)
        button.text "Prefix it!"
      error: ->
        alert "Failed converting code. Try again."
        button.text "Prefix it!"
