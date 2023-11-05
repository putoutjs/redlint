import ignore from 'ignore';
import parseOptionsOriginal from 'putout/parse-options';
import {opendir as opendirOriginal} from 'node:fs/promises';

const resolveName = (name, cwd) => name.replace(`${cwd}/`, '');

export const buildTree = async (cwd, {parseOptions = parseOptionsOriginal, opendir = opendirOriginal} = {}) => {
    const options = parseOptions();
    const ig = ignore().add(options.ignore.filter(isExcluded));
    
    return {
        type: 'directory',
        filename: cwd,
        files: await walk({
            cwd,
            dir: cwd,
            ignore: ig,
            opendir,
        }),
    };
};

async function walk({cwd, dir, ignore, files = [], opendir}) {
    for await (const dirent of await opendir(dir)) {
        const {path, name} = dirent;
        const filename = `${path}/${name}`;
        const resolved = resolveName(filename, cwd);
        
        if (resolved && ignore.ignores(resolved))
            continue;
        
        if (dirent.isDirectory()) {
            files.push({
                type: 'directory',
                filename,
                files: await walk({
                    cwd,
                    filename,
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

function isExcluded(a) {
    return a !== '**/yarn-error.log';
}
