import {logo} from './logo.js';
import chalk from 'chalk';
import process from 'node:process';

export const help = () => {
    console.log('Lint your files according to 🐊Putout rules.\n');
    process.stdout.write(logo);
    console.log('');
    console.log(`Usage: redlint ${chalk.bgBlue('command')}`);
    console.log(`Commands:
  ${chalk.bgBlue('scan')}     - scan files according to 🐊Putout rules
  ${chalk.bgBlue('fix')}      - fix files according to 🐊Putout rules
  ${chalk.bgBlue('help')}     - show help screen and exit
  ${chalk.bgBlue('generate')} - generate .filesystem.json file and exit
`);
    
    console.log('(c) https://github.com/putoutjs/redlint');
};
