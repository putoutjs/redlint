import {parentPort, workerData} from 'node:worker_threads';
import {createProgress} from '@putout/engine-runner/progress';
import {pack} from './pack.js';
import {createSlave} from '../slave.js';

const {filesystem, cwd} = workerData;
const progress = createProgress();

await createSlave(runPack, {
    progress,
    parentPort,
});

async function runPack() {
    return await pack(cwd, filesystem, {
        progress,
    });
}
