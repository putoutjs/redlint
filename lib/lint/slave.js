import {
    parentPort,
    workerData,
} from 'node:worker_threads';
import {lint} from './lint.js';
import {createSlave} from '../slave.js';
import {createProgress} from '@putout/engine-runner/progress';

const {fix, filesystem} = workerData;
const progress = createProgress();

await createSlave(runLint, {
    progress,
    parentPort,
});

function runLint() {
    return lint(filesystem, {
        fix,
        progress,
    });
}
