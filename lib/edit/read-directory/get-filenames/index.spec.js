import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['get-filenames', plugin],
    ],
});

test('edit: get-filenames: report', (t) => {
    const files = [
        '.gitignore',
        '.madrun.mjs',
        '.npmignore',
        'node_modules',
    ];
    
    t.reportWithOptions('get-filenames', files, {
        dir: '/',
    });
    t.end();
});

test('edit: get-filenames: report: nested', (t) => {
    const files = [
        '.gitignore',
        '.madrun.mjs',
        '.npmignore',
        'node_modules/putout/README.md',
    ];
    
    t.reportWithOptions('get-filenames', files, {
        dir: '/',
        nested: true,
    });
    t.end();
});

test('edit: get-filenames: report: nested: nested', (t) => {
    const files = ['.gitignore'];
    
    t.reportWithOptions('nested', files, {
        dir: '/hello',
        nested: true,
    });
    t.end();
});

test('edit: get-filenames: report: full', (t) => {
    const files = [
        '/.gitignore',
        '/.madrun.mjs',
        '/.npmignore',
        '/node_modules',
    ];
    
    t.reportWithOptions('get-filenames', files, {
        dir: '/',
        full: true,
    });
    t.end();
});

test('edit: get-filenames: report: full: nested', (t) => {
    const files = [
        '/.gitignore',
        '/.madrun.mjs',
        '/.npmignore',
        '/node_modules/putout/README.md',
    ];
    
    t.reportWithOptions('get-filenames', files, {
        dir: '/',
        full: true,
        nested: true,
    });
    t.end();
});

test('edit: get-filenames: no transform with options: get-filenames', (t) => {
    t.noTransformWithOptions('get-filenames', {
        dir: '/',
    });
    t.end();
});

test('edit: get-filenames: report: sort', (t) => {
    const files = [
        '.gitignore',
        '.madrun.mjs',
        '.npmignore',
        'README.md',
    ];
    
    t.reportWithOptions('sort', files, {
        dir: '/',
    });
    t.end();
});
