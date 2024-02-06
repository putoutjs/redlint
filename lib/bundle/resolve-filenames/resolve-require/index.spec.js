import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['resolve-require', plugin],
    ],
});

test('bundle: resolve-require: report', (t) => {
    t.report('resolve-require', `/b`);
    t.end();
});

test('bundle: resolve-require: transform', (t) => {
    t.transform('resolve-require');
    t.end();
});
