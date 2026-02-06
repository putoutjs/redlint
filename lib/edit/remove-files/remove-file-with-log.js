import process from 'node:process';
import {removeFile as _removeFile} from '@putout/cli-filesystem';

const {stdout} = process;
const write = stdout.write.bind(stdout);

export const removeFileWithLog = (name, overrides = {}) => {
    const {
        removeFile = _removeFile,
        log = write,
    } = overrides;
    
    removeFile(name);
    log(`⛳️ Removed '${name}'\n`);
};
