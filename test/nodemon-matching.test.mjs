import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);
const match = require('nodemon/lib/monitor/match');

test('patched nodemon glob matching preserves watches, ignores and extensions', () => {
  const root = process.cwd();
  const source = path.join(root, 'server.js');
  const ignored = path.join(root, 'node_modules', 'example', 'index.js');
  const text = path.join(root, 'notes.txt');
  const result = match([source, ignored, text], [root + '/**/*', '!' + root + '/node_modules/**/*'], 'js');
  assert.deepEqual(result.result.map((value) => path.resolve(value).toLowerCase()), [path.resolve(source).toLowerCase()]);
});
