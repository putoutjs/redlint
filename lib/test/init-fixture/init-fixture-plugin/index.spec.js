import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['init-fixture-plugin', plugin],
    ],
});

test('test: init-fixture-plugin: report', (t) => {
    t.reportWithOptions('init-fixture-plugin', `Init fixture 'a.js'`, {
        names: [['a.js', 'a-fix.js']],
    });
    t.end();
});

test('test: init-fixture-plugin: no report: no-names', (t) => {
    t.noReport('no-names');
    t.end();
});

test('test: init-fixture-plugin: exists', (t) => {
    t.noReportWithOptions('exists', {
        names: [['a.js', 'a-fix.js']],
    });
    t.end();
});

test('test: init-fixture-plugin: transform with options', (t) => {
    t.transformWithOptions('init-fixture-plugin', {
        names: [['a.js', 'a-fix.js']],
    });
    t.end();
});
