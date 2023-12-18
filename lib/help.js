import {logo} from './logo.js';
import process from 'node:process';

export const help = ({header = true}) => {
    if (header) {
        console.log('Lint your files according to 🐊Putout rules.\n');
        process.stdout.write(logo);
        console.log('');
    }
    
    console.log(`Usage: redlint [command]`);
    
    console.log(`Commands:
  scan      - scan files according to 🐊Putout rules
  fix       - fix files according to 🐊Putout rules
  help      - show help screen and exit
  generate  - generate .filesystem.json file and exit
`);
    
    console.log('');
};
