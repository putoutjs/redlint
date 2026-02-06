import {
    parse,
    print,
    transform,
} from 'putout';
import {create} from '@putout/processor-filesystem/create';
import {init, deinit} from '@putout/operator-filesystem';
import * as removeFilesPlugin from './remove-files-plugin/index.js';
import {removeFileWithLog as _removeFileWithLog} from './remove-file-with-log.js';

export const removeFiles = (filesystem, {dir, from, to}, overrides = {}) => {
    const {
        removeFile = _removeFileWithLog,
    } = overrides;
    
    const {branch, merge} = create({
        cli: false,
        maybeSimple: false,
    });
    
    const [{source}] = branch(filesystem);
    
    init({
        removeFile,
    });
    
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
    deinit();
    
    return merge(filesystem, [code]);
};
