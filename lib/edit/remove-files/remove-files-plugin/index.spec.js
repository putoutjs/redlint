import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-files-plugin', plugin],
    ],
});

test('edit: remove-files-plugin: report', (t) => {
    t.reportWithOptions('remove-files-plugin', `Remove '/README.md'`, {
        from: ['README.md'],
        to: [],
    });
    t.end();
});

test('edit: remove-files-plugin: no report with options', (t) => {
    t.noReportWithOptions('remove-files-plugin', {
        from: [],
        to: [],
    });
    t.end();
});

test('edit: remove-files-plugin: transform with options', (t) => {
    t.transformWithOptions('remove-files-plugin', {
        from: ['README.md'],
        to: [],
    });
    t.end();
});
