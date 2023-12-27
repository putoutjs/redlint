import {
    parentPort,
    workerData,
} from 'node:worker_threads';
import {createProgress} from '@putout/engine-runner/progress';
import {pack} from './pack.js';

const {filesystem, cwd} = workerData;
const progress = createProgress();

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
        i,
        n,
        rule,
        percent,
    }]);
});

parentPort.postMessage(['end', pack(cwd, filesystem, {
    progress,
})]);
