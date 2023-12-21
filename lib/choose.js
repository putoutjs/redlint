import {logo} from './help/logo.js';
import process from 'node:process';
import {choose as chooseDialog} from '@putout/cli-choose';

export const choose = async () => {
    console.log('Lint your files according to 🐊Putout rules.\n');
    process.stdout.write(logo);
    console.log('');
    
    const command = await chooseDialog('Command:', [
        'scan',
        'fix',
        'pack',
        'extract',
        'generate',
        'generate:simple',
        'help',
        'version',
        'debug',
        'exit',
    ]);
    
    console.log('');
    
    return command;
};
