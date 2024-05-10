import {
    parse,
    transform,
    print,
} from 'putout';
import {createProgress} from '@putout/engine-runner/progress';
import {
    branch as originalBranch,
    merge as originalMerge,
} from '@putout/processor-filesystem';
import {createOptions} from './create-options.js';

export const convert = (filename, type, filesystem, overrides = {}) => {
    const {
        progress = createProgress(),
        branch = originalBranch,
        merge = originalMerge,
    } = overrides;
    
    const [{source}] = branch(filesystem);
    const ast = parse(source);
    const options = createOptions(filename, type);
    
    transform(ast, filesystem, {
        fix: true,
        fixCount: 1,
        progress,
        ...options,
    });
    
    const code = print(ast);
    
    return merge(filesystem, [code]);
};
