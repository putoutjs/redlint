import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['read-fixtures-plugin', plugin],
    ],
});

test('test: read-fixtures-plugin: report', (t) => {
    t.report('read-fixtures-plugin', `/fixture/a.js -> hello`);
    t.end();
});

test('test: read-fixtures-plugin: transform', (t) => {
    t.transform('read-fixtures-plugin');
    t.end();
});
