import {
    test,
    stub,
} from 'supertape';
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
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

