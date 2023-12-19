import {logo} from './logo.js';
import process from 'node:process';
import {choose as chooseDialog} from '@putout/cli-choose';

export const choose = async () => {
    console.log('Lint your files according to 🐊Putout rules.\n');
    process.stdout.write(logo);
    console.log('');
    
    const command = await chooseDialog('Command:', [
        'scan',
        'scan:frame',
        'fix',
        'help',
        'generate',
        'generate:simple',
        'exit',
    ]);
    
    console.log('');
    
    return command;
};
