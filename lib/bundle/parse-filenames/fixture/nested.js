__putout_processor_filesystem([
    '/',
    ['/index.js', "require('./client/send.js');"],
    '/client/',
    ['/client/send.js', "require('./1.js'); module.exports = 'hello'"],
    ['/client/1.js', "require('./send.js');module.exports = '1'"],
]);
