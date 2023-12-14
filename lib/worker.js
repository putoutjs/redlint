import {Worker} from 'node:worker_threads';
import ora from 'ora';

export function workerScan(script) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(new URL('./slave.js', import.meta.url), {
            workerData: script,
        });
        
        let spinner;
        worker.on('message', ([event, data]) => {
            if (event === 'end') {
                resolve(data);
                return;
            }
            
            if (event === 'rule:start') {
                spinner = ora(data).start();
                return;
            }
            
            if (event === 'rule:end') {
                spinner.succeed();
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
