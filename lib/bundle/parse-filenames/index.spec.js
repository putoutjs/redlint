import {createTest} from '@putout/test';
import tryCatch from 'try-catch';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['parse-filenames', plugin],
    ],
});

test('lib: parse-filenames: report', (t) => {
    t.report('parse-filenames', ['/index.js', '/send.js', '/1.js']);
    t.end();
});

test('lib: parse-filenames: report: nested', (t) => {
    t.report('nested', ['/index.js', '/client/send.js', '/client/1.js']);
    t.end();
});

test('lib: parse-filenames: report: esm', (t) => {
    t.report('esm', ['/index.js', '/client/send.js', '/client/1.js']);
    t.end();
});

test('lib: parse-filenames: transform', (t) => {
    t.transform('parse-filenames');
    t.end();
});

test('lib: parse-filenames: no transform: not-found', (t) => {
    const [error] = tryCatch(t.transformWithOptions, 'not-found', {
        entry: 'index.js',
    });
    
    t.equal(error.message, `file '/xxx.js' not found`);
    t.end();
}, {
    checkAssertionsCount: false,
});
