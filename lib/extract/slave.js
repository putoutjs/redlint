import {parentPort, workerData} from 'node:worker_threads';
import {createProgress} from '@putout/engine-runner/progress';
import {extract} from './extract.js';

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

progress.on('file', ({rule, i, n}) => {
    parentPort.postMessage(['file', {
        i,
        n,
        rule,
    }]);
});

parentPort.postMessage(['end', extract(cwd, filesystem, {
    progress,
})]);
