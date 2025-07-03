import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['rename-files', plugin],
    ],
});

test('lib: rename-files: report', (t) => {
    const from = ['README.md'];
    
    const to = [
        '__README.md',
    ];
    
    t.reportWithOptions('rename-files', `Rename 'README.md' to '__README.md'`, {
        dir: '/',
        from,
        to,
    });
    t.end();
});

test('lib: rename-files: no report with options: equal', (t) => {
    const from = ['README.md'];
    
    const to = ['README.md'];
    
    t.noReportWithOptions('rename-files', {
        from,
        to,
        dir: '/',
    });
    t.end();
});

test('lib: rename-files: no report with options: different length', (t) => {
    const from = ['README.md'];
    
    const to = [
        'README.md',
        'HELLO',
    ];
    
    t.noReportWithOptions('rename-files', {
        from,
        to,
        dir: '/',
    });
    t.end();
});

test('lib: rename-files: transform', (t) => {
    const from = ['README.md'];
    
    const to = [
        '__README.md',
    ];
    
    t.transformWithOptions('rename-files', {
        from,
        to,
        dir: '/',
    });
    t.end();
});
