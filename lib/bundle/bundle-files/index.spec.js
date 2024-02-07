import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['bundle-files', plugin],
    ],
});

test('lib: bundle-files: report', (t) => {
    t.report('bundle-files', ``);
    t.end();
});

test('lib: bundle-files: transform', (t) => {
    t.transform('bundle-files');
    t.end();
});
