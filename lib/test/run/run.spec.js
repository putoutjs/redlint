import {test} from 'supertape';
import {run} from './run.js';

test('redlint: test: run', (t) => {
    const source = `
        module.exports.report = () => 'Use "const"';
        module.exports.replace = () => ({
                'let __a = __b': 'const __a = __b',
            });
        `;
    
    const fixture = `
        let a = 3;
    `;
    
    const result = run(source, {
        fixture,
    });
    
    const expected = 'const a = 3;\n';
    
    t.equal(result, expected);
    t.end();
});
