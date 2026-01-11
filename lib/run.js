import {Worker} from 'node:worker_threads';
import {fullstore} from 'fullstore';

export function run({test, workerData, slave, push, fix, start, end, fail, success, suffix}) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(slave, {
            workerData,
        });
        
        const store = fullstore({});
        
        worker.on('message', ([event, data]) => {
            if (event === 'end') {
                end(data, resolve);
                return;
            }
            
            if (test)
                return;
            
            if (event === 'rule:start') {
                start(data, store);
                return;
            }
            
            if (event === 'file') {
                suffix(store, data);
                return;
            }
            
            const {
                rule,
                count,
                spinner,
            } = store();
            
            if (!spinner)
                return;
            
            store({
                rule,
                count,
                spinner,
            });
            
            const endFail = count && event === 'rule:end';
            const endSuccess = !count && event === 'rule:end';
            
            if (!fix && event === 'rule:push') {
                push(store);
                return;
            }
            
            if (endFail) {
                fail(store);
                return;
            }
            
            if (endSuccess) {
                success(store);
                return;
            }
        });
        worker.on('error', reject);
        worker.on('exit', (code) => {
            reject(Error(`Worker stopped with exit code ${code}`));
        });
    });
}
