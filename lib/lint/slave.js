import {parentPort, workerData} from 'node:worker_threads';
import {createProgress} from '@putout/engine-runner/progress';
import {lint} from './lint.js';
import {createSlave} from '../slave.js';

const {
    fix,
    test,
    filesystem,
} = workerData;

const progress = createProgress();

await createSlave(runLint, {
    progress,
    parentPort,
});

function runLint() {
    return lint(filesystem, {
        fix,
        test,
        progress,
    });
}
