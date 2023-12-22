import {logo} from './help/logo.js';
import process from 'node:process';
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
    DEBUG,
    EXIT,
} from './menu.js';

export const choose = async () => {
    console.log('Lint your files according to 🐊Putout rules.\n');
    process.stdout.write(logo);
    console.log('');
    
    const command = await chooseDialog('Command:', [
        SCAN,
        FIX,
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
