import process from 'node:process';
import {execSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
import {readDirectory} from './read-directory/index.js';
import {writeTmpFile as _writeTmpFile} from './write-tmp-file.js';

export const edit = (filesystem, {dir, recursive, full}, overrides = {}) => {
    const {
        execute = execSync,
        readFileContent = readFileSync,
        writeTmpFile = _writeTmpFile,
        env = process.env,
    } = overrides;
    
    const {EDITOR} = env;
    
    const names = readDirectory(filesystem, {
        dir,
        recursive,
        full,
    });
    
    const content = names.join('\n');
    const [tmpFile, removeTmpFile] = writeTmpFile(content);
    
    const editor = EDITOR || 'vim';
    execute(`${editor} ${tmpFile}`, {
        stdio: [
            0,
            1,
            2,
            'pipe',
        ],
    });
    
    readFileContent(tmpFile, 'utf8');
    removeTmpFile();
};
