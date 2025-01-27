import {parentPort, workerData} from 'node:worker_threads';
import {createProgress} from '@putout/engine-runner/progress';
import {rename} from './rename.js';
import {createSlave} from '../slave.js';

const {
    filename,
    type,
    filesystem,
} = workerData;

const progress = createProgress();

await createSlave(runPack, {
    progress,
    parentPort,
});

async function runPack() {
    return await rename(filename, type, filesystem, {
        progress,
    });
}
