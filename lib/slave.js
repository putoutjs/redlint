import { parentPort, workerData,} from 'node:worker_threads';
import ora from 'ora';
import {scan} from './run.js';
import {createProgress} from '@putout/engine-runner/progress';

  const filesystem = workerData;
  const progress = createProgress();
  
  progress.on('rule:start', ({rule}) => {
     parentPort.postMessage(['rule:start', rule]);
  });
  
  progress.on('rule:end', ({rule}) => {
     parentPort.postMessage(['rule:end']);
  });
  
parentPort.postMessage(['end', scan(filesystem, {progress})]);
