import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['get-file-name-with-content', plugin],
    ],
});

test('view: get-file-name-with-content: report', (t) => {
    t.report('get-file-name-with-content', `1 -> /package.json -> {"type": "module"}`);
    t.end();
});

test('view: get-file-name-with-content: transform', (t) => {
    t.transform('get-file-name-with-content');
    t.end();
});
