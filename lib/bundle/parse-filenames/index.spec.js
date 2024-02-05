import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['parse-filenames', plugin],
    ],
});

test('lib: parse-filenames: report', (t) => {
    t.report('parse-filenames', ['/index.js', '/send.js', '/1.js']);
    t.end();
});

test('lib: parse-filenames: transform', (t) => {
    t.transform('parse-filenames');
    t.end();
});
