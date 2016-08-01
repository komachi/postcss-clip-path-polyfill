'use strict';
import postcss from 'postcss';

module.exports = postcss.plugin('postcss-clip-path-polyfill', () => css => {
  css.walkDecls('clip-path', decl => {
    let polygon = /^polygon\((.*)\)$/.exec(decl.value);
    if (!polygon) {
      return;
    }
    // SVG stores polygons in different format
    // so we convert css rule with that crappy code
    let polygons = polygon[1].split(',').map(pols => {
      return pols.trim().split(',').map(pol => {
        return pol.split(' ').map(unit => {
          if (unit.slice(-1) === '%') {
            return unit.replace('%', '') / 100;
          }
          return unit.replace('px', '');
        }).join(' ');
      }).join(' ');
    }).join(', ');
    let svg = encodeURI('<svg xmlns="http://www.w3.org/2000/svg">' +
'<defs><clipPath id="p" clipPathUnits="objectBoundingBox">' +
'<polygon points="' + polygons + '" /></clipPath></defs></svg>')
  .replace(/%20/g, ' ').replace(/%22/g, '"');
    let svgDecl = decl.cloneBefore({
      value: `url('data:image/svg+xml;utf8,${svg}#p')`
    });
    decl.cloneAfter({prop: '-webkit-' + decl.prop});
    decl.moveBefore(svgDecl);
  });
});
