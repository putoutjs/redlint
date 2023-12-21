import {run} from '../run.js';
import {
    setStart,
    setEnd,
    setPush,
    setFail,
    setSuccess,
} from '../spinner.js';

export function masterExtract(cwd, filesystem, {
    start = setStart,
    end = setEnd,
    push = setPush,
    fail = setFail,
    success = setSuccess,
} = {}) {
    const slave = new URL('./slave.js', import.meta.url);
    const fix = true;
    
    return run(cwd, filesystem, {
        fix,
        start,
        end,
        push,
        fail,
        success,
        slave,
    });
}