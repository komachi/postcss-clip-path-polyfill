import test from 'ava';
import {runTest} from './runTest.helper.js';

test('Should convert percentage correctly', t => {

  return runTest().then(result => {
    /* eslint-disable max-len */
    t.is(result.css,
`.test1 {
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  clip-path: url('data:image/svg+xml;utf8,%3Csvg xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3CclipPath id="p" clipPathUnits="objectBoundingBox"%3E%3Cpolygon points="0.5 0, 0 1, 1 1" /%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E#p');
}
`
    );
    /* eslint-enable max-len */
  });
});
