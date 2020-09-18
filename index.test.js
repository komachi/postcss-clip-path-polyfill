const postcss = require('postcss');
const plugin = require('./');

const testCss = `
.test1 {
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}
`;

async function run (input, output) {
  let result = await postcss([plugin()])
    .process(input, { from: undefined });
  expect(result.css).toEqual(output);
  expect(result.warnings()).toHaveLength(0);
}

it('convert css sucessufully', async () => {
  const resultCss = `
.test1 {
  clip-path: url('data:image/svg+xml;utf8,%3Csvg xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3CclipPath id="p" clipPathUnits="objectBoundingBox"%3E%3Cpolygon points="0.5 0, 0 1, 1 1"/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E#p');
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}
`;
  await run(testCss, resultCss)
});
