import {logo} from './logo.js';
import process from 'node:process';

export const help = ({header = true}) => {
    if (header) {
        console.log('Lint your files according to 🐊Putout rules.\n');
        process.stdout.write(logo);
        console.log('');
    }
    
    console.log(`Usage: redlint [command]`);
    
    process.stdout.write(`Commands:
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
