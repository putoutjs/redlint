import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['get-fixture-only-names', plugin],
    ],
});

test('test: get-fixture-only-names: report', (t) => {
    t.report('get-fixture-only-names', ['only']);
    t.end();
});

test('test: get-fixture-only-names: report: couple', (t) => {
    t.report('couple', ['unused']);
    t.end();
});

test('test: get-fixture-only-names: no report: no-only', (t) => {
    t.noReport('no-only');
    t.end();
});

test('test: get-fixture-only-names: no transform', (t) => {
    t.noTransform('get-fixture-only-names');
    t.end();
});
