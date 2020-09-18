'use strict';

function transformClipPathDeclaration (decl) {
  const polygon = /^polygon\((.*)\)$/.exec(decl.value);
  if (!polygon) {
    return;
  }
  // SVG stores polygons in different format
  // so we convert css rule with that crappy code
  const polygons = polygon[1].split(',').map(pols => {
    return pols.trim().split(',').map(pol => {
      return pol.split(' ').map(unit => {
        if (unit.slice(-1) === '%') {
          return unit.replace('%', '') / 100;
        }
        return unit.replace('px', '');
      }).join(' ');
    }).join(' ');
  }).join(', ');

  const svg = (
    '<svg xmlns="http://www.w3.org/2000/svg"><defs>' +
    '<clipPath id="p" clipPathUnits="objectBoundingBox">' +
    `<polygon points="${polygons}"/></clipPath></defs></svg>`
  )
    .replace(/%/g, '%25')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E')
    .replace(/&/g, '%26')
    .replace(/#/g, '%23');

  decl.cloneBefore({
    value: `url('data:image/svg+xml;utf8,${svg}#p')`
  });
}

module.exports = () => {
  return {
    postcssPlugin: 'postcss-clip-path-polyfill',
    Declaration: {
      'clip-path': transformClipPathDeclaration
    }
  };
};

module.exports.postcss = true;