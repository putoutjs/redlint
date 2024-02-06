# Bundle

## Convert ESM to CommonJS

To Simplify things up all files converted to CommonJS first.
Let's suppose none of them use top-level await to get things simpler.

## Parse filenames

Traverse all files starting from `entry` and get all filenames.

- [`parse-require`](https://putout.cloudcmd.io/#/gist/d973366be6b07ab705b5c9d793369904/ca8b6b15fa953d95f57b42e07136c65791f38ca1)
- [`parse-filenames`](https://putout.cloudcmd.io/#/gist/d973366be6b07ab705b5c9d793369904/3067150ad161029e75b95e9bfff290e03953ef41)

## Bundle all files to object

Traverse filesystem and create object that contains filename and file content:

```
const __filesystem = {
    '/entry.js': () => {
        const client = require('/client.js');
        console.log(client);
    },
    '/client.js': (exports, require, module) => {
        module.exports = 'hello';
    },
};
```

## IIFE

Most likely we need IIFE so couple bundles can be loaded on page simultaneously.

## Result Example

```js
(() => {
    const __modules = {};
    const __filesystem = {
        '/entry.js': () => {
            const client = require('/client.js');
            console.log(client);
        },
        '/client.js': (exports, require, module) => {
            module.exports = 'hello';
        },
    };
    
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
    
    require('/entry.js');
})();
```