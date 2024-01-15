import {
    parentPort,
    workerData,
} from 'node:worker_threads';
import {createProgress} from '@putout/engine-runner/progress';
import {convert} from './convert.js';
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
    return await convert(filename, type, filesystem, {
        progress,
    });
}
