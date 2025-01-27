import {choose as chooseDialog} from '@putout/cli-choose';
import {
    SCAN,
    FIX,
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
} from './menu.js';

export const choose = async () => {
    const command = await chooseDialog('Command:', [
        SCAN,
        FIX,
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
    
    console.log('');
    
    return command;
};
