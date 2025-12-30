import {opendir as _opendir} from 'node:fs/promises';
import {parseOptions as _parseOptions} from 'putout/parse-options';
import {ignores} from 'putout/ignores';

export const buildTree = async (cwd, overrides = {}) => {
    const {
        parseOptions = _parseOptions,
        opendir = _opendir,
    } = overrides;
    
    const options = parseOptions();
    
    return {
        type: 'directory',
        filename: cwd,
        files: await walk({
            cwd,
            dir: cwd,
            opendir,
            options,
        }),
    };
};

async function walk({cwd, dir, options, files = [], opendir}) {
    for await (const dirent of await opendir(dir)) {
        const {name} = dirent;
        const filename = `${dir}/${name}`;
        
        if (ignores(cwd, filename, options))
            continue;
        
        if (dirent.isDirectory()) {
            files.push({
                type: 'directory',
                filename,
                files: await walk({
                    cwd,
                    dir: filename,
                    options,
                    opendir,
                }),
            });
            continue;
        }
        
        files.push({
            type: 'file',
            filename,
        });
    }
    
    return files;
}
