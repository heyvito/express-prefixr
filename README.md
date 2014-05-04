express-prefixr
===============

Node + Express Prefixr alternative

Demo: [http://expressprefixr.herokuapp.com](http://expressprefixr.herokuapp.com)

Automatically prefixes vendored properties in CSS and SCSS files, as an alternative
to [prefixr.com](http://prefixr.com).

API
-----
Express-Prefixr also exposes a public API. To use it, send a POST request to `http://expressprefixr.herokuapp.com/api/processor`, passing your stylesheet through the `css` form parameter.

Example:

```bash
~ » curl http://localhost:3000/api/processor -d css='body { border-radius: 10px; }'
{
     "status": "success",
     "result": "body {\n  -webkit-border-radius: 10px;\n  -moz-border-radius: 10px;\n  -ms-border radius: 10px;\n  -o-border-radius: 10px;\n  border-radius: 10px;\n}"
}
```

TODO
-----
- [ ] *Re*Add support to fragment-prefixing
- [ ] Add support to `@-rules`

Acknowledgements
----------------
**Uses portions of [Express.js](http://expressjs.com), licensed under The MIT License**

Copyright (c) 2009-2012 TJ Holowaychuk <tj@vision-media.ca>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.