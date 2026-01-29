import {putout} from 'putout';

const noop = () => {};

export const run = (content, options) => {
    const {require = noop, incorrect} = options;
    
    if (!incorrect)
        return;
    
    const plugin = createPlugin(content, require);
    
    return runPlugin(plugin, incorrect);
};

function runPlugin(plugin, source) {
    const {code} = putout(source, {
        plugins: [
            ['run', plugin],
        ],
    });
    
    return code;
}

function createPlugin(content, require) {
    const {code} = putout(content, {
        plugins: [
            'nodejs/convert-esm-to-commonjs',
            'remove-nested-blocks',
            'putout',
        ],
    });
    
    const fn = Function('module, exports, require', code);
    
    const exports = {};
    const module = {
        exports,
    };
    
    fn(module, exports, require);
    
    return exports;
}
