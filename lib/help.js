import {logo} from './logo.js';
import chalk from 'chalk';

const greenBraceOpen = chalk.green('[');
const greenBraceClose = chalk.green(']');

const redBraceOpen = chalk.red('[');
const redBraceClose = chalk.red(']');

const yellowBraceOpen = chalk.yellow('[');
const yellowBraceClose = chalk.yellow(']');

const blueBraceOpen = chalk.blueBright('[');
const blueBraceClose = chalk.blueBright(']');

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
