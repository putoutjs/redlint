import {
    parentPort,
    workerData,
} from 'node:worker_threads';
import {lint} from './lint.js';
import {createProgress} from '@putout/engine-runner/progress';

const {fix, filesystem} = workerData;
const progress = createProgress();

await createSlave(lint, filesystem, {
    fix,
    progress,
});

async function createSlave(fn, ...args) {
    progress.on('start', ({rule}) => {
        parentPort.postMessage(['rule:start', rule]);
    });

    progress.on('push', ({rule}) => {
        parentPort.postMessage(['rule:push', rule]);
    });

    progress.on('end', ({rule}) => {
        parentPort.postMessage(['rule:end', rule]);
    });

    progress.on('file', ({rule, i, n, percent}) => {
        parentPort.postMessage(['file', {
            rule,
            i,
            n,
            percent,
        }]);
    });

    parentPort.postMessage(['end', await lint(filesystem, {
        fix,
        progress,
    })]);
}

