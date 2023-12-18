import {test} from 'supertape';
import {logo} from './logo.js';

test('redlint: logo', (t) => {
    t.ok(logo);
    t.end();
});
