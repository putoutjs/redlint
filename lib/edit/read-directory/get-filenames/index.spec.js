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

test('edit: get-filenames: report: recursive', (t) => {
    const files = [
        '.gitignore',
        '.madrun.mjs',
        '.npmignore',
        'node_modules',
        'node_modules/putout',
        'node_modules/putout/README.md',
    ];
    
    t.reportWithOptions('get-filenames', files, {
        dir: '/',
        recursive: true,
    });
    t.end();
});

test('edit: get-filenames: report: recursive: nested', (t) => {
    const files = [
        '.gitignore',
        'node_modules',
        'node_modules/putout',
    ];
    
    t.reportWithOptions('nested', files, {
        dir: '/hello',
        recursive: true,
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

test('edit: get-filenames: report: full: recursive', (t) => {
    const files = [
        '/.gitignore',
        '/.madrun.mjs',
        '/.npmignore',
        '/node_modules',
        '/node_modules/putout',
        '/node_modules/putout/README.md',
    ];
    
    t.reportWithOptions('get-filenames', files, {
        dir: '/',
        full: true,
        recursive: true,
    });
    t.end();
});

test('edit: get-filenames: no transform with options: get-filenames', (t) => {
    t.noTransformWithOptions('get-filenames', {
        dir: '/',
    });
    t.end();
});
