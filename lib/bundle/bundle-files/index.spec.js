import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['bundle-files', plugin],
    ],
});

test('lib: bundle-files: report', (t) => {
    t.reportWithOptions('bundle-files', ``, {
        entry: '/index.js',
        filenames: [
            '/index.js',
            '/send.js',
        ],
    });
    t.end();
});

test('lib: bundle-files: no report: no options', (t) => {
    t.noReport('no-options');
    t.end();
});

test('lib: bundle-files: transform', (t) => {
    t.transformWithOptions('bundle-files', {
        entry: '/index.js',
        filenames: [
            '/index.js',
            '/send.js',
        ],
    });
    t.end();
});
