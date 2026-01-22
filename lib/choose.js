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
} from './menu.js';

export const choose = async () => {
    const command = await chooseDialog('Command:', [
        SCAN,
        FIX,
        VIEW,
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
    
    console.log('');
    
    return command;
};
