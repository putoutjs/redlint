import {transform} from 'putout';
import * as initFixturePlugin from './init-fixture-plugin/index.js';

export const initFixture = (ast, names) => {
    transform(ast, {
        rules: {
            'init-fixtures': ['on', {
                names,
            }],
        },
        plugins: [
            ['init-fixtures', initFixturePlugin],
        ],
    });
    
    return ast;
};
