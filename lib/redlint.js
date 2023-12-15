import ignore from 'ignore';
import parseOptionsOriginal from 'putout/parse-options';
import {opendir as opendirOriginal} from 'node:fs/promises';
import ignores from 'putout/ignores';

const resolveName = (name, cwd) => name.replace(`${cwd}/`, '');

export const buildTree = async (cwd, {parseOptions = parseOptionsOriginal, opendir = opendirOriginal} = {}) => {
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
                    ignore,
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
