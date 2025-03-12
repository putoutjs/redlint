import {stub, test} from 'supertape';
import {writeTmpFile} from './write-tmp-file.js';

test('redlint: edit: writeTmpFile: createTmpDirectory', (t) => {
    const createTmpDirectory = stub().returns('x');
    const writeFileContent = stub();
    const generateTmpName = stub().returns('abc');
    
    writeTmpFile('hello world', {
        createTmpDirectory,
        writeFileContent,
        generateTmpName,
    });
    
    t.calledWith(createTmpDirectory, ['abc/redlint-']);
    t.end();
});

test('redlint: edit: writeTmpFile: returns', (t) => {
    const createTmpDirectory = stub().returns('x');
    const writeFileContent = stub();
    const generateTmpName = stub().returns('abc');
    
    const result = writeTmpFile('hello world', {
        createTmpDirectory,
        writeFileContent,
        generateTmpName,
    });
    
    const expected = ['x/edit.tmp', stub()];
    
    t.deepEqual(result, expected);
    t.end();
});

test('redlint: edit: writeTmpFile: removeTmpFile', (t) => {
    const createTmpDirectory = stub().returns('x');
    const writeFileContent = stub();
    const generateTmpName = stub().returns('abc');
    const removeDirectory = stub();
    
    const [, removeTmpFile] = writeTmpFile('hello world', {
        createTmpDirectory,
        writeFileContent,
        generateTmpName,
        removeDirectory,
    });
    
    removeTmpFile();
    
    const expected = ['x', {
        recursive: true,
    }];
    
    t.calledWith(removeDirectory, expected);
    t.end();
});
