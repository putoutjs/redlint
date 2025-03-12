import {test, stub} from 'supertape';
import {edit} from './edit.js';
import {writeTmpFile as _writeTmpFile} from './write-tmp-file.js';

const {stringify} = JSON;

test('redlint: edit', (t) => {
    const options = {
        dir: '/',
    };
    
    const removeTmpFile = stub();
    const execute = stub();
    const readFileContent = stub().returns('[]');
    const writeTmpFile = stub().returns(['hello', removeTmpFile]);
    
    const overrides = {
        execute,
        readFileContent,
        writeTmpFile,
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
    
    const env = {
        EDITOR: 'emacs',
    };
    
    const overrides = {
        execute,
        readFileContent,
        writeTmpFile,
        env,
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
    
    const env = {
    };
    
    const overrides = {
        execute,
        readFileContent,
        writeTmpFile,
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

