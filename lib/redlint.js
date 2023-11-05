import ignore from 'ignore';
import {opendir} from 'node:fs/promises';
import {resolve} from 'node:path';

const resolveName = (name, cwd) => name.replace(cwd + '/', '');

const ignoreList = [
    'node_modules',
    'coverage',
    '.git',
    '.idea',
    'fixture',
];

const ig = ignore().add(ignoreList);

export const buildTree = async (cwd) => ({
    type: 'directory',
    filename: cwd,
    files: await walk(cwd, cwd),
});

async function walk(cwd, dir, files = []) {
    for await (const dirent of await opendir(dir)) {
        const {path, name} = dirent;
        const filename = `${path}/${name}`;
        const resolved = resolveName(filename, cwd);
        
        if (resolved && ig.ignores(resolved))
            continue;
        
        console.log(ig.ignores(resolved), resolved);
        
        if (dirent.isDirectory()) {
            files.push({
                type: 'directory',
                filename,
                files: await walk(cwd, filename),
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
