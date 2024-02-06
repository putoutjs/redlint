import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['resolve-filenames', plugin],
    ],
});

test('redlint: bundle: resolve-filenames: report', (t) => {
    t.report('resolve-filenames', `/index.js`);
    t.end();
});

test('redlint: bundle: resolve-filenames: transform', (t) => {
    t.transform('resolve-filenames');
    t.end();
});
