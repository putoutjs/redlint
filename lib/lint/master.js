import {run} from '../run.js';
import {
    setStart,
    setEnd,
    setPush,
    setFail,
    setSuccess,
} from '../spinner.js';

export function masterLint(filesystem, {fix, test, start = setStart, end = setEnd, push = setPush, fail = setFail, success = setSuccess}) {
    const slave = new URL('./slave.js', import.meta.url);
    const workerData = {
        filesystem,
        fix,
    };
    
    return run({
        workerData,
        fix,
        start,
        end,
        push,
        fail,
        success,
        test,
        slave,
    });
}
