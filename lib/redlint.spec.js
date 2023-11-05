import {
    test,
    stub,
} from 'supertape';

import {buildTree} from './redlint.js';

test('redlint: buildTree', async (t) => {
    const parseOptions = stub().returns({
        ignore: [],
    });
    
    const opendir = stub().returns([{
        isDirectory: stub().returns(false),
        path: '/hello',
        name: 'world.txt',
    }]);
    
    await buildTree('/hello', {
        parseOptions,
        opendir,
    });
    
    t.calledWithNoArgs(parseOptions);
    t.end();
});

test('redlint: buildTree: directory', async (t) => {
    const parseOptions = stub().returns({
        ignore: [
            'node_modules',
        ],
    });
    
    const results = [[{
        isDirectory: stub().returns(true),
        path: '/hello',
        name: 'world',
    }], [{
        isDirectory: stub().returns(true),
        path: '/hello',
        name: 'node_modules',
    }, {
        isDirectory: stub().returns(false),
        path: '/hello/world',
        name: 'world.txt',
    }]];
    
    const opendir = () => results.shift();
    
    await buildTree('/hello', {
        cwd: '/hello',
        parseOptions,
        opendir,
    });
    
    t.calledWithNoArgs(parseOptions);
    t.end();
});

test('redlint: buildTree: ignore', async (t) => {
    const parseOptions = stub().returns({
        ignore: [
            '**/yarn-error.log',
        ],
    });
    
    const opendir = stub().returns([{
        isDirectory: stub().returns(false),
        path: '/hello',
        name: 'yarn-error.log',
    }]);
    
    await buildTree('/hello', {
        parseOptions,
        opendir,
    });
    
    t.calledWithNoArgs(parseOptions);
    t.end();
});

