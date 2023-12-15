import {
    parentPort,
    workerData,
} from 'node:worker_threads';
import {lint} from './lint.js';
import {createProgress} from '@putout/engine-runner/progress';

const {filesystem, fix} = workerData;

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

parentPort.postMessage(['end', lint(filesystem, {
    fix,
    progress,
})]);
