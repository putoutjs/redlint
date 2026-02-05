import process from 'node:process';
import montag from 'montag';

const {stdout} = process;

export const help = () => {
    stdout.write(`Usage: redlint edit\n`);
    stdout.write(montag`
        Options:
          -n, --nested      - edit nested file paths
          -f, --full        - edit full paths
          -r, --remove      - remove files
    `);
    stdout.write('\n');
};
