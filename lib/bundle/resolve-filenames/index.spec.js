import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['resolve-filenames', plugin],
    ],
});

test('redlint: bundle: resolve-filenames: report', (t) => {
    t.reportWithOptions('resolve-filenames', `/index.js`, {
        filenames: ['/index.js', '/send.js'],
    });
    t.end();
});

test('redlint: bundle: resolve-filenames: transform', (t) => {
    t.transformWithOptions('resolve-filenames', {
        filenames: ['/index.js', '/send.js'],
    });
    t.end();
});

test('redlint: bundle: resolve-filenames: transform: esm', (t) => {
    t.transformWithOptions('esm', {
        filenames: ['/index.js', '/send.js'],
    });
    t.end();
});
