import {transform} from 'putout';
import * as initFixturePlugin from './init-fixture-plugin/index.js';

export const initFixture = (ast, names) => {
    transform(ast, '', {
        rules: {
            'init-fixture': ['on', {
                names,
            }],
        },
        plugins: [
            ['init-fixture', initFixturePlugin],
        ],
    });
    
    return ast;
};
