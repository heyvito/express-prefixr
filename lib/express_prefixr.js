(function() {
  var CSSDocument, app, express, logfmt, port,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  express = require('express');

  CSSDocument = require('./css_document');

  logfmt = require('logfmt');

  app = express();

  app.use(express["static"]("" + __dirname + "/../public"));

  app.use(logfmt.requestLogger());

  app.use(express.json());

  app.use(express.urlencoded());

  app.set('views', "" + __dirname + "/../views");

  app.set('view engine', 'jade');

  app.get('/', function(req, res) {
    return res.render('index', {
      host: req.headers.host
    });
  });

  app.post('/api/processor', function(req, res) {
    var css, ex, fragment, fragment_hacky_regex, fragment_hacky_selector, response;
    css = req.body.css;
    fragment = __indexOf.call(css, '{') < 0;
    fragment_hacky_selector = '.prefixr-hacky-selector';
    fragment_hacky_regex = new RegExp("" + fragment_hacky_selector + "\\s?\{\\n*([^}]+)\}", 'gi');
    response = {
      status: null,
      result: null
    };
    if (fragment) {
      css = "" + fragment_hacky_selector + " { " + css + " }";
    }
    try {
      css = new CSSDocument(css);
    } catch (_error) {
      ex = _error;
      console.log("Error: " + ex);
      if ((ex.name != null) && ex.name === 'ParsingException') {
        response.status = "error";
        response.result = ex.message;
      }
    }
    if (response.status == null) {
      css.parseDocument();
      css.rebuildDocument();
      response.status = "success";
      response.result = css.rebuildCSS();
    }
    if (fragment) {
      response.result = fragment_hacky_regex.exec(response.result.toString())[1].split('\n').map(function(item) {
        return item.replace(/(^\s+|\s+$)/g, '');
      }).join('\n');
    }
    res.setHeader('Content-Type', 'application/json');
    return res.send(JSON.stringify(response));
  });

  port = Number(process.env.PORT || 3000);

  app.listen(port, function() {
    return console.log("Listening on " + port);
  });

}).call(this);
