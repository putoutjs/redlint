import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['parse-require', plugin],
    ],
});

test('lib: parse-require: report', (t) => {
    t.report('parse-require', `/b.js`);
    t.end();
});

test('lib: parse-require: transform', (t) => {
    t.transform('parse-require');
    t.end();
});
