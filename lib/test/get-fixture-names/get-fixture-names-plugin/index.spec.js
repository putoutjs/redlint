import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['get-fixture-names', plugin],
    ],
});

test('test: get-fixture-names: report', (t) => {
    t.report('get-fixture-names', 'same-directory');
    t.end();
});

test('test: get-fixture-names: report: couple', (t) => {
    t.report('couple', 'unused');
    t.end();
});

test('test: get-fixture-names: no transform', (t) => {
    t.noTransform('get-fixture-names');
    t.end();
});
