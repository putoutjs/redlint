import { opendir } from 'node:fs/promises';
import {relative} from 'node:path';
import fastGlob from 'fast-glob';

const ignore = [
    'node_modules',
    'coverage',
    '.git',
    '.idea',
    'fixture',
];

export const buildTree = async (filename) => {
    return {
        type: 'directory',
        filename,
        files: await walk(filename)
    };
};

async function walk(cwd, files = []) {
    const dir = await opendir(cwd);
    
    for await (const dirent of dir) {
        const {path, name} = dirent;
        
        if (isIgnored(name))
            continue;
        
        const filename = `${path}/${name}`;
        
        if (dirent.isDirectory()) {
            debugger;
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
