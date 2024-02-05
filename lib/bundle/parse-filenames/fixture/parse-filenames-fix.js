__putout_processor_filesystem([
    "/",
    ["/index.js", "require('./send.js');"],
    ["/send.js", "require('./1.js'); module.exports = 'hello'"],
    ["/1.js", "require('./send.js');module.exports = '1'"]
]);
