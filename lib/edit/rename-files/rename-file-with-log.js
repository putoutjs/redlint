import process from 'node:process';
import {renameFile as _renameFile} from '@putout/cli-filesystem';

const {stdout} = process;
const write = stdout.write.bind(stdout);

export const renameFileWithLog = (from, to, overrides = {}) => {
    const {
        renameFile = _renameFile,
        log = write,
    } = overrides;
    
    renameFile(from, to);
    log(`🦜 Renamed '${from}' -> '${to}'\n`);
};
