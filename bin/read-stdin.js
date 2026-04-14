import {promisify} from 'node:util';
import process from 'node:process';

export const readStdin = promisify((overrides, fn) => {
    const {stdin} = fn ? overrides : process;
    
    fn = fn || overrides;
    
    stdin.setEncoding('utf8');
    
    if (stdin.isTTY)
        return fn(null, '');
    
    const data = [];
    
    stdin.on('data', (chunk) => {
        data.push(chunk);
    });
    
    stdin.on('end', () => {
        fn(null, data.join(''));
    });
});
