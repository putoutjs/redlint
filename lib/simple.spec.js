import {test} from 'supertape';
import {convertToSimple} from './simple.js';

test('redlint: simple', (t) => {
    const tree = {
        type: 'directory',
        filename: '/',
        files: [{
            type: 'file',
            filename: '/hello.txt',
        }, {
            type: 'file',
            filename: '/world.txt',
            content: 'hello world',
        }, {
            type: 'directory',
            filename: '/abc',
            files: [],
        }],
    };
    
    const result = convertToSimple(tree);
    const expected = [
        '/',
        '/hello.txt',
        [
            '/world.txt',
            'hello world',
        ],
        '/abc/',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});
