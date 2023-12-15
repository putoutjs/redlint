import {Worker} from 'node:worker_threads';
import ora from 'ora';
import chalk from 'chalk';
import fullstore from 'fullstore';

export function masterLint(filesystem, {fix, start = setStart, end = setEnd, push = setPush, fail = setFail, success = setSuccess}) {
    return run(filesystem, {
        fix,
        start,
        end,
        push,
        fail,
        success,
    });
}

function setStart(rule, store) {
    const spinner = ora(rule).start();
    
    spinner.suffixText = '';
    
    store({
        rule,
        count: 0,
        spinner,
    });
}

function setPush(store) {
    const {
        rule,
        count,
        spinner,
    } = store();
    
    store({
        rule,
        count: count + 1,
        spinner,
    });
}

function setFail(store) {
    const {
        rule,
        count,
        spinner,
    } = store();
    
    spinner.suffixText = chalk.red(count);
    spinner.fail();
    
    store({
        rule,
        count,
        spinner,
    });
}

function setSuccess(store) {
    const {spinner} = store();
    
    spinner.succeed();
    spinner.suffixText = '';
    
    store({
        ...store(),
        spinner: null,
    });
}

function setEnd(data, resolve) {
    resolve(data);
}

function run(filesystem, {fix, start, end, push, fail, success}) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(new URL('./slave.js', import.meta.url), {
            workerData: {
                filesystem,
                fix,
            },
        });
        
        const store = fullstore({});
        
        worker.on('message', ([event, data]) => {
            if (event === 'end') {
                end(data, resolve);
                return;
            }
            
            if (event === 'rule:start') {
                start(data, store);
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
            if (code)
                reject(Error(`Worker stopped with exit code ${code}`));
        });
    });
}
