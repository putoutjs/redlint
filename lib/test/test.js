import {createRequire} from 'node:module';
import {operator, parse} from 'putout';
import {branch as _branch} from '@putout/processor-filesystem';
import {codeFrameColumns} from '@putout/babel';
import {getFixtureNames} from './get-fixture-names/index.js';
import {initFixture} from './init-fixture/index.js';
import {readFixture} from './read-fixture/index.js';
import {run} from './run/run.js';

const createLog = (output) => (a) => {
    output.push(`${a}\n`);
};

const {
    findFile,
    readFileContent,
    getFilename,
} = operator;

const SUCCESS = '🍀';
const FAIL = '🍄';

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
    const log = createLog(output);
    
    for (const [name, [incorrect, correct]] of fixture) {
        const output = run(plugin, {
            require,
            incorrect,
        });
        
        const status = correct === output ? SUCCESS : FAIL;
        
        log(`# ${status} ${name}`);
        
        if (status === SUCCESS)
            continue;
        
        log('');
        log(`## ❌ Incorrect code\n`);
        log(codeFrameColumns(incorrect, {}, {
            highlightCode: true,
        }));
        log('');
        log(`## ✅ Correct code\n`);
        
        log(codeFrameColumns(correct, {}, {
            highlightCode: true,
        }));
        log('');
    }
    
    return [null, output.join('')];
};
