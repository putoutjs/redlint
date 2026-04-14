import {EventEmitter} from 'node:events';
import {test, stub} from 'supertape';
import {readStdin} from './read-stdin.js';

const {assign} = Object;

test('redlint: read-stdout', async (t) => {
    const stdin = new EventEmitter();
    const setEncoding = stub();
    
    assign(stdin, {
        setEncoding,
    });
    
    const emit = stdin.emit.bind(stdin, ['data']);
    const end = stdin.emit.bind(stdin, ['end']);
    
    const [result] = await Promise.all([
        readStdin({
            stdin,
        }),
        emit('hello'),
        end(),
    ]);
    
    const expected = 'hello';
    
    t.equal(result, expected);
    t.end();
});

test('redlint: read-stdout: setEncoding', async (t) => {
    const stdin = new EventEmitter();
    const setEncoding = stub();
    
    assign(stdin, {
        setEncoding,
    });
    
    const emit = stdin.emit.bind(stdin, ['data']);
    const end = stdin.emit.bind(stdin, ['end']);
    
    await Promise.all([
        readStdin({
            stdin,
        }),
        emit('hello'),
        end(),
    ]);
    
    t.calledWith(setEncoding, ['utf8']);
    t.end();
});

test('redlint: read-stdout: isTTY', async (t) => {
    const stdin = new EventEmitter();
    const setEncoding = stub();
    
    assign(stdin, {
        setEncoding,
        isTTY: true,
    });
    
    const emit = stdin.emit.bind(stdin, ['data']);
    const end = stdin.emit.bind(stdin, ['end']);
    
    const [result] = await Promise.all([
        readStdin({
            stdin,
        }),
        emit('hello'),
        end(),
    ]);
    
    t.notOk(result);
    t.end();
});

