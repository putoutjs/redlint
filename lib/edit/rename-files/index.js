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
import * as renameFilesFullPlugin from './rename-files-full-plugin/index.js';

export const renameFiles = (filesystem, {full, dir, from, to}, overrides = {}) => {
    const {
        branch = originalBranch,
        merge = originalMerge,
    } = overrides;
    
    const [{source}] = branch(filesystem);
    
    const ast = parse(source);
    const options = getOptions({
        dir,
        from,
        to,
        full,
    });
    
    transform(ast, filesystem, {
        ...options,
        fix: true,
        fixCount: 1,
    });
    
    const code = print(ast);
    
    return merge(filesystem, [code]);
};

function getOptions({full, from, to, dir}) {
    if (full)
        return {
            rules: {
                'rename-files-full': ['on', {
                    from,
                    to,
                }],
            },
            plugins: [
                ['rename-files-full', renameFilesFullPlugin],
            ],
        };
    
    return {
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
    };
}
