export const createSlave = async (fn, {parentPort, progress}) => {
    progress.on('start', ({rule}) => {
        parentPort.postMessage(['rule:start', rule]);
    });
    
    progress.on('push', ({rule}) => {
        parentPort.postMessage(['rule:push', rule]);
    });
    
    progress.on('end', ({rule}) => {
        parentPort.postMessage(['rule:end', rule]);
    });
    
    progress.on('file', ({rule, i, n, percent}) => {
        parentPort.postMessage(['file', {
            rule,
            i,
            n,
            percent,
        }]);
    });
    
    parentPort.postMessage(['end', await fn()]);
};
