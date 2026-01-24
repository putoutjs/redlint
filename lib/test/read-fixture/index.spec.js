import {
    parseFilesystem,
    test,
} from '@putout/test/filesystem';
import {readFixture} from './index.js';

test('redlint: test: read-fixture', (t) => {
    const ast = parseFilesystem([
        '/',
        '/fixture/',
        ['/fixture/a.js', 'hello'],
        ['/fixture/a-fix.js', 'world'],
    ]);
    
    const result = readFixture(ast, [
        ['a.js', 'a-fix.js'],
    ]);
    
    const expected = new Map([
        ['a', [
            'hello',
            'world',
        ]],
    ]);
    
    t.deepEqual(result, expected);
    t.end();
});
