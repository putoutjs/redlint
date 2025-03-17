import process from 'node:process';
import {execSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
import {readDirectory} from './read-directory/index.js';
import {writeTmpFile as _writeTmpFile} from './write-tmp-file.js';
import {renameFiles as _renameFiles} from './rename-files/index.js';

export const edit = (filesystem, {dir, nested, full}, overrides = {}) => {
    const {
        execute = execSync,
        readFileContent = readFileSync,
        writeTmpFile = _writeTmpFile,
        renameFiles = _renameFiles,
        env = process.env,
    } = overrides;
    
    const {EDITOR} = env;
    
    const names = readDirectory(filesystem, {
        dir,
        nested,
        full,
    });
    
    const from = names.join('\n');
    const [tmpFile, removeTmpFile] = writeTmpFile(from);
    
    const editor = EDITOR || 'vim';
    execute(`${editor} ${tmpFile}`, {
        stdio: [
            0,
            1,
            2,
            'pipe',
        ],
    });
    
    const to = readFileContent(tmpFile, 'utf8');
    
    const newNames = to
        .split('\n')
        .slice(0, -1);
    
    removeTmpFile();
    
    renameFiles(filesystem, {
        dir,
        from: names,
        to: newNames,
        full,
    });
};
