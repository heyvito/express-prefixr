vendoredValues = [
  'linear-gradient', 'radial-gradient',
  'repeating-linear-gradient', 'repeating-radial-gradient'
]

module.exports = (vendors, css) ->
  vendoredValues.forEach (func) ->
    regex = new RegExp "(?:;*)([ \s\t]*)?([a-z1-9-]+)[ \s\t]*:[ \s\t]*#{func}([^\n;}]+);?", 'ig'
    css = css.replace regex, (match, spaces, prop, value) ->
      spaces = spaces or ''
      result = spaces + match.replace("\n", '').trim() + "\n";
      value = value.replace("\n", '').trim()

      vendors.forEach (vendor) ->
        result += "#{spaces}#{prop}: #{vendor}#{func}#{value};\n"
      result
  css
