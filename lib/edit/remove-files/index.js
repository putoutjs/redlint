import {
    parse,
    print,
    transform,
} from 'putout';
import {
    branch as originalBranch,
    merge as originalMerge,
} from '@putout/processor-filesystem';
import * as removeFilesPlugin from './remove-files-plugin/index.js';

export const removeFiles = (filesystem, {dir, from, to}, overrides = {}) => {
    const {
        branch = originalBranch,
        merge = originalMerge,
    } = overrides;
    
    const [{source}] = branch(filesystem);
    
    const ast = parse(source);
    
    transform(ast, filesystem, {
        rules: {
            'remove-files': ['on', {
                dir,
                from,
                to,
            }],
        },
        plugins: [
            ['remove-files', removeFilesPlugin],
        ],
    });
    
    const code = print(ast);
    
    return merge(filesystem, [code]);
};
