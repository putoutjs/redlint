import {test, stub} from 'supertape';
import {edit} from './edit.js';

const {stringify} = JSON;

test('redlint: edit', (t) => {
    const options = {
        dir: '/',
    };
    
    const removeTmpFile = stub();
    const execute = stub();
    const readFileContent = stub().returns('[]');
    const writeTmpFile = stub().returns(['hello', removeTmpFile]);
    const renameFiles = stub();
    
    const overrides = {
        execute,
        readFileContent,
        writeTmpFile,
        renameFiles,
    };
    
    const filesystem = stringify(['/', '/hello']);
    
    edit(filesystem, options, overrides);
    
    t.calledWithNoArgs(removeTmpFile);
    t.end();
});

test('redlint: edit: EDITOR', (t) => {
    const options = {
        dir: '/',
    };
    
    const removeTmpFile = stub();
    const execute = stub();
    const readFileContent = stub().returns('[]');
    const writeTmpFile = stub().returns(['hello', removeTmpFile]);
    const renameFiles = stub();
    
    const env = {
        EDITOR: 'emacs',
    };
    
    const overrides = {
        execute,
        readFileContent,
        writeTmpFile,
        env,
        renameFiles,
    };
    
    const filesystem = stringify(['/', '/hello']);
    
    edit(filesystem, options, overrides);
    
    const expected = ['emacs hello', {
        stdio: [
            0,
            1,
            2,
            'pipe',
        ],
    }];
    
    t.calledWith(execute, expected);
    t.end();
});

test('redlint: edit: EDITOR: no', (t) => {
    const options = {
        dir: '/',
    };
    
    const removeTmpFile = stub();
    const execute = stub();
    const readFileContent = stub().returns('[]');
    const writeTmpFile = stub().returns(['hello', removeTmpFile]);
    const renameFiles = stub();
    
    const env = {};
    
    const overrides = {
        execute,
        readFileContent,
        writeTmpFile,
        renameFiles,
        env,
    };
    
    const filesystem = stringify(['/', '/hello']);
    
    edit(filesystem, options, overrides);
    
    const expected = ['vim hello', {
        stdio: [
            0,
            1,
            2,
            'pipe',
        ],
    }];
    
    t.calledWith(execute, expected);
    t.end();
});

test('redlint: edit: renameFiles', (t) => {
    const options = {
        dir: '/',
    };
    
    const removeTmpFile = stub();
    const execute = stub();
    const readFileContent = stub().returns('[""]');
    const writeTmpFile = stub().returns(['hello', removeTmpFile]);
    const renameFiles = stub();
    
    const env = {};
    
    const overrides = {
        execute,
        readFileContent,
        writeTmpFile,
        renameFiles,
        env,
    };
    
    const filesystem = stringify(['/', '/hello']);
    
    edit(filesystem, options, overrides);
    
    const expected = [
        stringify(['/', '/hello']), {
            dir: '/',
            from: ['hello'],
            full: undefined,
            to: [],
        },
    ];
    
    t.calledWith(renameFiles, expected);
    t.end();
});
