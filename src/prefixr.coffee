

vendoredProperties = [
  'align-content', 'align-items', 'align-self', 'alt', 'animation',
  'animation-delay', 'animation-direction', 'animation-duration',
  'animation-fill-mode', 'animation-iteration-count', 'animation-name',
  'animation-play-state', 'animation-timing-function', 'appearance',
  'backface-visibility', 'background-clip', 'background-composite',
  'background-origin', 'background-size', 'border-after', 'border-after-color',
  'border-after-style', 'border-after-width', 'border-before',
  'border-before-color', 'border-before-style', 'border-before-width',
  'border-bottom-left-radius', 'border-bottom-right-radius', 'border-end',
  'border-end-color', 'border-end-style', 'border-end-width', 'border-fit',
  'border-image', 'border-radius', 'border-start', 'border-start-color',
  'border-start-style', 'border-start-width', 'border-top-left-radius',
  'border-top-right-radius', 'box-align', 'box-decoration-break', 'box-flex',
  'box-flex-group', 'box-lines', 'box-ordinal-group', 'box-orient', 'box-pack',
  'box-reflect', 'box-shadow', 'box-sizing', 'clip-path', 'column-axis',
  'column-break-after', 'column-break-before', 'column-break-inside',
  'column-count', 'column-fill', 'column-gap', 'column-progression', 'column-rule',
  'column-rule-color', 'column-rule-style', 'column-rule-width', 'column-span',
  'column-width', 'columns', 'dashboard-region', 'filter', 'flex', 'flex-basis',
  'flex-direction', 'flex-flow', 'flex-grow', 'flex-shrink', 'flex-wrap',
  'flow-from', 'flow-into', 'font-size-delta', 'grid-area', 'grid-auto-columns',
  'grid-auto-flow', 'grid-auto-rows', 'grid-column', 'grid-column-end',
  'grid-column-start', 'grid-row', 'grid-row-end', 'grid-row-start',
  'grid-template-areas', 'grid-template-columns', 'grid-template-rows',
  'isolation', 'justify-content', 'line-clamp', 'logical-height', 'logical-width',
  'margin-after', 'margin-after-collapse', 'margin-before',
  'margin-before-collapse', 'margin-bottom-collapse', 'margin-collapse',
  'margin-end', 'margin-start', 'margin-top-collapse', 'marquee',
  'marquee-direction', 'marquee-increment', 'marquee-repetition',
  'marquee-speed', 'marquee-style', 'mask', 'mask-box-image',
  'mask-box-image-outset', 'mask-box-image-repeat', 'mask-box-image-slice',
  'mask-box-image-source', 'mask-box-image-width', 'mask-clip', 'mask-composite',
  'mask-image', 'mask-origin', 'mask-position', 'mask-position-x',
  'mask-position-y', 'mask-repeat', 'mask-repeat-x', 'mask-repeat-y', 'mask-size',
  'mask-source-type', 'max-logical-height', 'max-logical-width',
  'min-logical-height', 'min-logical-width', 'mix-blend-mode', 'opacity', 'order',
  'padding-after', 'padding-before', 'padding-end', 'padding-start', 'perspective',
  'perspective-origin', 'perspective-origin-x', 'perspective-origin-y',
  'region-break-after', 'region-break-before', 'region-break-inside',
  'region-fragment', 'shape-image-threshold', 'shape-inside', 'shape-margin',
  'shape-outside', 'shape-padding', 'svg-shadow', 'tap-highlight-color',
  'text-decoration', 'text-decoration-color', 'text-decoration-line',
  'text-decoration-style', 'touch-callout', 'transform', 'transform-origin',
  'transform-origin-x', 'transform-origin-y', 'transform-origin-z',
  'transform-style', 'transition', 'transition-delay', 'transition-duration',
  'transition-property', 'transition-timing-function', 'user-drag', 'wrap-flow',
  'wrap-through' ]

vendors = [ '-webkit-', '-moz-', '-ms-', '-o-' ]

module.exports = (css) =>
  vendoredProperties.forEach (prop) ->
    regex = new RegExp "(?:;*)([ \s\t]*)?(#{prop})[ \s\t]*:([^\n;}]+);?", 'ig'
    css = css.replace regex, (match, spaces, prop, value) ->
      spaces = spaces or ''
      result = ''
      value = value.replace("\n", '').trim()

      # The snippet below was taken from https://github.com/LeaVerou/prefixfree
      if value.indexOf 'linear-gradient' > -1
        value = value.replace /(\s|:|,)(repeating-)?linear-gradient\(\s*(-?\d*\.?\d*)deg/ig, ($0, delim, repeating, deg) ->
          repeating = repeating or ''
          "#{delim}#{repeating}linear-gradient(#{90 - deg}deg)"

      vendors.forEach (vendor) ->
        result += "#{spaces}#{vendor}#{prop}: #{value};\n"
      result
  css
