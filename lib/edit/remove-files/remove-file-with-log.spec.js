import {test, stub} from 'supertape';
import {removeFileWithLog} from './remove-file-with-log.js';

test('redlint: edit: remove-files: remove-file-with-log: log', (t) => {
    const removeFile = stub();
    const log = stub();
    
    removeFileWithLog('hello', {
        log,
        removeFile,
    });
    
    t.calledWith(log, [`⛳️ Removed 'hello'\n`]);
    t.end();
});

test('redlint: edit: remove-files: remove-file-with-log: removeFile', (t) => {
    const removeFile = stub();
    const write = stub();
    
    removeFileWithLog('hello', {
        write,
        removeFile,
    });
    
    t.calledWith(removeFile, ['hello']);
    t.end();
});
