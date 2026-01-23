import {putout} from 'putout';
import * as getFixtureNamesPlugin from './get-fixture-names-plugin/index.js';

const getName = (a) => a.message;

export const getFixtureNames = (source) => {
    const {places} = putout(source, {
        fix: false,
        plugins: [
            ['get-fixture-names', getFixtureNamesPlugin],
        ],
    });
    
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
