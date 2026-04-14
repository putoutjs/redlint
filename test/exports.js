import {test} from './create-test.js';

test('redlint: exports: simple', async (t) => {
    const result = await import('redlint/simple');
    const expected = await import('../lib/simple.js');
    
    t.equal(result, expected);
    t.end();
});
