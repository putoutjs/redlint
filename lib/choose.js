import process from 'node:process';
import {choose as chooseDialog} from '@putout/cli-choose';
import {
    SCAN,
    FIX,
    VIEW,
    PACK,
    EXTRACT,
    GENERATE,
    GENERATE_SIMPLE,
    HELP,
    VERSION,
    CONVERT,
    RENAME,
    DEBUG,
    EXIT,
    EDIT,
    TEST,
} from './menu.js';

const {stdout} = process;

export const choose = async () => {
    const command = await chooseDialog('Command:', [
        SCAN,
        FIX,
        VIEW,
        TEST,
        EDIT,
        RENAME,
        CONVERT,
        PACK,
        EXTRACT,
        GENERATE,
        GENERATE_SIMPLE,
        HELP,
        VERSION,
        DEBUG,
        EXIT,
    ]);
    
    stdout.write('\n');
    
    return command;
};

