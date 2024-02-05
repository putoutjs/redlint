import {run} from '../run.js';
import {
    setStart,
    setEnd,
    setPush,
    setFail,
    setSuccess,
    setSuffixText,
} from '../spinner.js';

export function masterLint(filesystem, {fix, suffix = setSuffixText, test, start = setStart, end = setEnd, push = setPush, fail = setFail, success = setSuccess}) {
    const slave = new URL('./slave.js', import.meta.url);
    const workerData = {
        filesystem,
        fix,
        test,
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
        suffix,
    });
}
