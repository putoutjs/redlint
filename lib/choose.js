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
    DEBUG,
    EXIT,
} from './menu.js';

export const choose = async () => {
    const command = await chooseDialog('Command:', [
        SCAN,
        FIX,
        PACK,
        EXTRACT,
        GENERATE,
        GENERATE_SIMPLE,
        CONVERT,
        HELP,
        VERSION,
        DEBUG,
        EXIT,
    ]);
    
    console.log('');
    
    return command;
};
