import postcss from 'postcss';
import clipPathPolyfill from '../src/index.js';
import {readFile} from 'fs';

export function runTest(options, file) {
  if (!file) {
    file = `${__dirname}/test.css`;
  }
  return new Promise((res, rej) => {
    readFile(file, (err, content) => {
      if (err) {
        rej(err);
        return;
      }
      res(postcss([clipPathPolyfill()]).process(content.toString()));
    });
  });
}
