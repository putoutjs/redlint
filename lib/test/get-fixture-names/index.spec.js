import {test} from 'supertape';
import montag from 'montag';
import {getFixtureNames} from './index.js';

test('redlint: test: get-fixture-names', (t) => {
    const source = montag`
        t.transform('hello');
    `;
    
    const result = getFixtureNames(source);
    const expected = [
        ['hello.js', 'hello-fix.js'],
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('redlint: test: get-fixture-names: only', (t) => {
    const source = montag`
        t.transform('hello');
        test.only('hello', (t) => {
            t.transform('world');
        });
    `;
    
    const result = getFixtureNames(source);
    const expected = [
        ['world.js', 'world-fix.js'],
    ];
    
    t.deepEqual(result, expected);
    t.end();
});
