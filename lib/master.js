import {Worker} from 'node:worker_threads';
import ora from 'ora';
import chalk from 'chalk';

export function masterScan(script) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(new URL('./slave.js', import.meta.url), {
            workerData: script,
        });
        
        let spinner;
        let currentRule;
        let currentPlacesCount = 0;
        worker.on('message', ([event, data]) => {
            if (event === 'end') {
                resolve(data);
                return;
            }
            
            if (event === 'rule:start') {
                currentRule = data;
                
                spinner = ora(currentRule).start();
                spinner.suffixText = '';
                
                currentPlacesCount = 0;
                return;
            }
            
            if (!spinner)
                return;
            
            const fail = currentPlacesCount && event === 'rule:end';
            const success = !currentPlacesCount && event === 'rule:end';
            
            if (event === 'rule:push') {
                ++currentPlacesCount;
                return;
            }
            
            if (fail) {
                spinner.suffixText = chalk.red(currentPlacesCount);
                spinner.fail();
                return;
            }
            
            if (success) {
                spinner.succeed();
                spinner.suffixText = '';
                spinner = null;
                return;
            }
        });
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code)
                reject(Error(`Worker stopped with exit code ${code}`));
        });
    });
}
