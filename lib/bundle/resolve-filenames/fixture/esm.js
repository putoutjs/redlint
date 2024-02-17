__putout_processor_filesystem([
    '/',
    ['/index.js', "import {send} from './send.js';"],
    ['/send.js', "import one from './1.js'; export default 'hello';"],
]);
