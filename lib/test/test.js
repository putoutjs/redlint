import {operator, parse} from 'putout';
import {branch as _branch} from '@putout/processor-filesystem';
import {getFixtureNames} from './get-fixture-names/index.js';

const {
    findFile,
    readFileContent,
} = operator;

export const test = (filesystem, overrides = {}) => {
    const {branch = _branch} = overrides;
    
    const [{source}] = branch(filesystem);
    const root = parse(source);
    
    const [file] = findFile(root, '/index.spec.js');
    
    if (!file)
        return [
            Error(`No 'index.spec.js' found`),
        ];
    
    const specContent = readFileContent(file);
    
    return [null, getFixtureNames(specContent)];
};
