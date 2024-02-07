(() => {
    const __filesystem = {
        '/index.js': (exports, require, module) => {
            require('./send.js');
        },
        '/send.js': (exports, require, module) => {
            module.exports = 'hello';
        },
    };
    const __modules = {};
    const require = (name) => {
        const exports = {};
        const module = {
            exports,
        };
        if (__modules[name])
            return __modules[name];
        
        __filesystem[name](exports, require, module);
        __modules[name] = module.exports;
        return module.exports;
    };
    
    require('/index.js');
})();
