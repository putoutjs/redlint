import {putout} from 'putout';

const noop = () => {};

export const run = (content, config) => {
    const {
        require = noop,
        incorrect,
        options,
    } = config;
    
    if (!incorrect)
        return;
    
    const plugin = createPlugin(content, require);
    
    return runPlugin(plugin, incorrect, options);
};

function runPlugin(plugin, source, options) {
    const {code} = putout(source, {
        rules: {
            run: ['on', options],
        },
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
    
    return module.exports;
}
