import {
    parse,
    print,
    transform,
} from 'putout';
import {
    branch as originalBranch,
    merge as originalMerge,
} from '@putout/processor-filesystem';
import * as renameFilesPlugin from './rename-files-plugin/index.js';

export const renameFiles = (filesystem, {dir, from, to}, overrides = {}) => {
    const {
        branch = originalBranch,
        merge = originalMerge,
    } = overrides;
    
    const [{source}] = branch(filesystem);
    
    const ast = parse(source);
    
    transform(ast, filesystem, {
        fix: true,
        fixCount: 1,
        rules: {
            'rename-files': ['on', {
                dir,
                from,
                to,
            }],
        },
        plugins: [
            ['rename-files', renameFilesPlugin],
        ],
    });
    
    const code = print(ast);
    
    return merge(filesystem, [code]);
};
