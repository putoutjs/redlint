import {choose as chooseDialog} from '@putout/cli-choose';
import {
    SCAN_DEBUG,
    PACK_DEBUG,
    FIX_DEBUG,
    BACK,
    EXIT,
} from './menu.js';

export const debug = async () => {
    const command = await chooseDialog('Debug:', [
        SCAN_DEBUG,
        FIX_DEBUG,
        PACK_DEBUG,
        BACK,
        EXIT,
    ]);
    
    console.log('');
    
    return command;
};
