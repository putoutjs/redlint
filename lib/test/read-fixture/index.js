import {basename} from 'node:path';
import {transform} from 'putout';
import * as readFixturesPlugin from './read-fixture-plugin/index.js';

const {fromEntries, entries} = Object;
const getMessage = (a) => a.message;
const SPLITTER = ' -> ';

export const readFixture = (ast, names) => {
    const places = transform(ast, {
        rules: {
            'read-fixture': ['on', {
                names,
            }],
        },
        plugins: [
            ['read-fixture', readFixturesPlugin],
        ],
    });
    
    const parsedFixtures = parseFixtures(places);
    
    return mergeFixtures(parsedFixtures);
};

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
    const result = places
        .map(getMessage)
        .map(split);
    
    return fromEntries(result);
}

const isFixFileName = (a) => a.endsWith('-fix.js');
const getNameFix = (a) => a.replace('.js', '-fix.js');
const cutExtension = (a) => a.replace('.js', '');

function mergeFixtures(fixture) {
    const result = new Map();
    const filesFix = new Map();
    const files = new Map();
    const names = new Map();
    
    for (const [name, content] of entries(fixture)) {
        if (isFixFileName(name)) {
            filesFix.set(name, content);
            continue;
        }
        
        files.set(name, content);
        names.set(name, getNameFix(name));
    }
    
    for (const [name, content] of files) {
        const nameFix = names.get(name);
        const contentFix = filesFix.get(nameFix);
        const shortName = cutExtension(name);
        
        result.set(shortName, [content, contentFix]);
    }
    
    return result;
}
