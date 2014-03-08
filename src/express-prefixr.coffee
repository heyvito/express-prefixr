express = require('express')
cssbeautify = require('cssbeautify')
prefixr = require('./prefixr')
logfmt = require('logfmt')

app = express()

app.use(express.static("#{__dirname}/../public"))

app.use logfmt.requestLogger()
app.use express.json()
app.use express.urlencoded()

app.set 'views', "#{__dirname}/../views"
app.set 'view engine', 'jade'

app.get '/', (req, res) ->
  res.render 'index',
    host: req.headers.host

app.post '/api/processor', (req, res) ->
  css = prefixr req.body.css
  css = cssbeautify css
  res.send css

port = Number(process.env.PORT or 3000)
app.listen port, ->
  console.log("Listening on #{port}")
