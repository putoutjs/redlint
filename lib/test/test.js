import {createRequire} from 'node:module';
import {operator, parse} from 'putout';
import {branch as _branch} from '@putout/processor-filesystem';
import {codeFrameColumns} from '@putout/babel';
import {getFixtureNames} from './get-fixture-names/index.js';
import {initFixture} from './init-fixture/index.js';
import {readFixture} from './read-fixture/index.js';
import {run} from './run/run.js';

const {entries} = Object;

const {
    findFile,
    readFileContent,
    getFilename,
} = operator;

export const test = (filesystem, overrides = {}) => {
    const {branch = _branch} = overrides;
    
    const [{source}] = branch(filesystem);
    const ast = parse(source);
    
    const [spec] = findFile(ast, 'index.spec.js');
    
    if (!spec)
        return [
            Error(`No 'index.spec.js' found`),
        ];
    
    const [index] = findFile(ast, 'index.js');
    
    if (!index)
        return [
            Error(`No 'index.js' found`),
        ];
    
    const specContent = readFileContent(spec);
    const names = getFixtureNames(specContent);
    
    initFixture(ast, names);
    const fixture = readFixture(ast, names);
    
    const plugin = readFileContent(index);
    const filename = getFilename(index);
    const require = createRequire(filename);
    
    const output = ['\n'];
    const log = (a) => {
        output.push(`${a}\n`);
    };
    
    for (const [name, incorrect] of entries(fixture)) {
        const correct = run(plugin, {
            require,
            incorrect,
        });
        
        log(`# ${name}\n`);
        log(`## ❌ Incorrect code\n`);
        log('```js');
        log(codeFrameColumns(incorrect, {}, {
            highlightCode: true,
        }));
        log('```');
        log(`## ✅ Correct code\n`);
        log('```js');
        log(codeFrameColumns(correct, {}, {
            highlightCode: true,
        }));
        log('```\n');
    }
    
    return [null, output.join('')];
};
