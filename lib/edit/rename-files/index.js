import {create} from '@putout/processor-filesystem/create';
import {
    parse,
    print,
    transform,
} from 'putout';
import * as renameFilesPlugin from './rename-files-plugin/index.js';
import * as renameFilesFullPlugin from './rename-files-full-plugin/index.js';
import {renameFileWithLog} from './rename-file-with-log.js';

export const renameFiles = (filesystem, {full, dir, from, to}, overrides = {}) => {
    const {
        renameFile = renameFileWithLog,
    } = overrides;
    
    const {branch, merge} = create({
        cli: true,
        maybeSimple: false,
        filesystemCLI: {
            renameFile,
        },
    });
    
    const [{source}] = branch(filesystem);
    
    const ast = parse(source);
    const options = getOptions({
        dir,
        from,
        to,
        full,
    });
    
    transform(ast, {
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
