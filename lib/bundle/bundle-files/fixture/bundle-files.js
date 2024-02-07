__putout_processor_filesystem({
    "type": "directory",
    "filename": "/",
    "files": [{
        "filename": "/index.js",
        "type": "file",
        "content": "require('./send.js');",
    }, {
        "filename": "/send.js",
        "type": "file",
        "content": "module.exports = 'hello';",
    }],
});