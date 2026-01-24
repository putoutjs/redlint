import {basename} from 'node:path';
import {transform} from 'putout';
import * as readFixturesPlugin from './read-fixture-plugin/index.js';

const {fromEntries} = Object;

export const readFixture = (ast, names) => {
    const places = transform(ast, '', {
        rules: {
            'read-fixture': ['on', {
                names,
            }],
        },
        plugins: [
            ['read-fixture', readFixturesPlugin],
        ],
    });
    
    return parseFixtures(places);
};

const getMessage = (a) => a.message;

const SPLITTER = ' -> ';
const split = (a) => {
    const [name] = a.split(SPLITTER, 1);
    const nameLength = name.length;
    const {length} = SPLITTER;
    const content = a.slice(length + nameLength);
    
    return [
        basename(name),
        content,
    ];
};

function parseFixtures(places) {
    const entries = places
        .map(getMessage)
        .map(split);
    
    return fromEntries(entries);
}

