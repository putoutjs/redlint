import {
    parse,
    print,
    transform,
} from 'putout';
import {create} from '@putout/processor-filesystem/create';
import * as removeFilesPlugin from './remove-files-plugin/index.js';
import {removeFileWithLog} from './remove-file-with-log.js';

export const removeFiles = (filesystem, {dir, from, to}, overrides = {}) => {
    const {
        removeFile = removeFileWithLog,
    } = overrides;
    
    const {branch, merge} = create({
        cli: true,
        maybeSimple: false,
        filesystemCLI: {
            removeFile,
        },
    });
    
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
