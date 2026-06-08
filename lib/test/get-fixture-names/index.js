import {putout} from 'putout';
import * as getFixtureNamesPlugin from './get-fixture-names-plugin/index.js';
import * as getFixtureOnlyNamesPlugin from './get-fixture-only-names-plugin/index.js';

const {parse} = JSON;

const getNameWithOptions = (a) => {
    return a.message.split(' -> ');
};

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
        const names = fixturesOnly.map(getNameWithOptions);
        return convertToTuple(names);
    }
    
    const names = places.map(getNameWithOptions);
    
    return convertToTuple(names);
};

function convertToTuple(names) {
    const result = [];
    
    for (const [base, options = '{}'] of names) {
        const name = `${base}.js`;
        const nameFix = `${base}-fix.js`;
        
        result.push([name, nameFix, parse(options)]);
    }
    
    return result;
}
