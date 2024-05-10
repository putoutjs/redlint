import {run} from '../run.js';
import {
    setStart,
    setEnd,
    setPush,
    setFail,
    setSuccess,
    setSuffixText,
} from '../spinner.js';

export function masterConvert(filename, type, filesystem, overrides = {}) {
    const {
        start = setStart,
        end = setEnd,
        push = setPush,
        fail = setFail,
        success = setSuccess,
        suffix = setSuffixText,
    } = overrides;
    
    const slave = new URL('./slave.js', import.meta.url);
    const workerData = {
        filename,
        type,
        filesystem,
    };
    
    return run({
        fix: true,
        start,
        end,
        push,
        fail,
        success,
        slave,
        workerData,
        suffix,
    });
}
