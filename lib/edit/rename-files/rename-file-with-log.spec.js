import {test, stub} from 'supertape';
import {renameFileWithLog} from './rename-file-with-log.js';

test('redlint: edit: rename-files: rename-file-with-log: log', (t) => {
    const renameFile = stub();
    const log = stub();
    
    renameFileWithLog('hello', 'world', {
        log,
        renameFile,
    });
    
    t.calledWith(log, [`🦜 Renamed 'hello' -> 'world'\n`]);
    t.end();
});

test('redlint: edit: rename-files: rename-file-with-log: renameFile', (t) => {
    const renameFile = stub();
    const log = stub();
    
    renameFileWithLog('hello', 'world', {
        log,
        renameFile,
    });
    
    t.calledWith(renameFile, ['hello', 'world']);
    t.end();
});
