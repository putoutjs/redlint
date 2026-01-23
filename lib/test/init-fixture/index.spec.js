import {
    parseFilesystem,
    test,
} from '@putout/test/filesystem';
import {initFixture} from './index.js';

test('redlint: test: init-fixture', (t) => {
    const ast = parseFilesystem(['/']);
    
    const result = initFixture(ast, [
        ['a.js', 'a-fix.js'],
    ]);
    
    const expected = [
        '/',
        '/fixture/',
        '/fixture/a.js',
        '/fixture/a-fix.js',
    ];
    
    t.equalFilesystems(result, expected);
    t.end();
});
