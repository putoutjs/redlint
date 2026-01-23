import process from 'node:process';
import {logo} from './logo.js';

const {stdout} = process;

export const help = ({header = true}) => {
    if (header) {
        stdout.write('Lint your files according to 🐊Putout rules.\n\n');
        process.stdout.write(logo);
        stdout.write('\n');
    }
    
    stdout.write(`Usage: redlint [command]\n`);
    
    stdout.write(`Commands:
  scan              - scan files according to 🐊Putout rules
  fix               - fix files according to 🐊Putout rules
  pack              - pack 'filesystem.red' with directory contents
  extract           - extract directory contents from 'filesystem.red'
  convert           - convert one file type to another according to selected choice from menu
  help              - show help screen and exit
  generate          - generate .filesystem.json file and exit
  generate:simple   - generate simple .filesystem.json file and exit
  version           - show version and exit
  debug             - run commands without workers
`);
};
