import {logo} from './logo.js';
import process from 'node:process';
import {choose} from '@putout/cli-choose';

export const start = async () => {
    console.log('Lint your files according to 🐊Putout rules.\n');
    process.stdout.write(logo);
    console.log('');
    
    const command = await choose('Command:', [
        'scan',
        'fix',
        'help',
        'generate',
    ]);
    
    console.log('');
    
    return command;
};
