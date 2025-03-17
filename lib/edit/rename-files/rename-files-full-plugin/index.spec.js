import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['rename-files-full', plugin],
    ],
});

test('edit: rename-files-full: report', (t) => {
    const from = [
        '/hello/README.md',
    ];
    
    const to = [
        '/hello/abc/_README.md',
    ];
    
    t.reportWithOptions('rename-files-full', `Rename '/hello/README.md' to '/hello/abc/_README.md'`, {
        from,
        to,
    });
    t.end();
});

test('edit: rename-files-full: no report: equal', (t) => {
    t.noReport('rename-files-full');
    t.end();
});

test('edit: rename-files-full: no report: equal: different length', (t) => {
    t.noReportWithOptions('rename-files-full', {
        from: ['/'],
        to: [],
    });
    t.end();
});

test('edit: rename-files-full: transform', (t) => {
    const from = [
        '/hello/README.md',
    ];
    
    const to = [
        '/hello/abc/_README.md',
    ];
    
    t.transformWithOptions('rename-files-full', {
        from,
        to,
    });
    t.end();
});

test('edit: rename-files-full: transform: remove', (t) => {
    const from = [
        '/hello/README.md',
    ];
    
    const to = [''];
    
    t.transformWithOptions('remove', {
        from,
        to,
    });
    t.end();
});
