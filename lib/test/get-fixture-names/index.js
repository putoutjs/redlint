import {putout} from 'putout';
import * as getFixtureNamesPlugin from './get-fixture-names-plugin/index.js';
import * as getFixtureOnlyNamesPlugin from './get-fixture-only-names-plugin/index.js';

const getName = (a) => a.message;
const isOnly = (a) => a.rule === 'get-fixture-only-names';

export const getFixtureNames = (source) => {
    const {places} = putout(source, {
        fix: false,
        plugins: [
            ['get-fixture-names', getFixtureNamesPlugin],
            ['get-fixture-only-names', getFixtureOnlyNamesPlugin],
        ],
    });
    
    const fixturesOnly = places.filter(isOnly);
    
    if (fixturesOnly.length) {
        const names = fixturesOnly.map(getName);
        return convertToTuple(names);
    }
    
    const names = places.map(getName);
    
    return convertToTuple(names);
};

function convertToTuple(names) {
    const result = [];
    
    for (const base of names) {
        const name = `${base}.js`;
        const nameFix = `${base}-fix.js`;
        
        result.push([name, nameFix]);
    }
    
    return result;
}
