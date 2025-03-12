import {test} from 'supertape';
import {readDirectory} from './index.js';

const {stringify} = JSON;

test('redlint: edit: readDirectory', (t) => {
    const filesystem = stringify(['/', '/hello']);
    
    const names = readDirectory(filesystem, {
        dir: '/',
    });
    
    const expected = ['hello'];
    
    t.deepEqual(names, expected);
    t.end();
});
