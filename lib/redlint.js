import {opendir} from 'node:fs/promises';

const ignore = [
    'node_modules',
    'coverage',
    '.git',
    '.idea',
    'fixture',
];

export const buildTree = async (filename) => ({
    type: 'directory',
    filename,
    files: await walk(filename),
});

async function walk(cwd, files = []) {
    const dir = await opendir(cwd);
    
    for await (const dirent of dir) {
        const {path, name} = dirent;
        
        if (isIgnored(name))
            continue;
        
        const filename = `${path}/${name}`;
        
        if (dirent.isDirectory()) {
            files.push({
                type: 'directory',
                filename,
                files: await walk(filename),
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

function isIgnored(name) {
    for (const current of ignore) {
        if (RegExp(current).test(name))
            return true;
    }
    
    return false;
}
