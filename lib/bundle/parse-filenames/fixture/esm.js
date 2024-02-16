__putout_processor_filesystem([
    '/',
    ['/index.js', "import a from './client/send.js';"],
    '/client/',
    ['/client/send.js', "import a1 from './1.js'; export default function a() {}"],
    ['/client/1.js', "export default function a1() {}"],
]);
