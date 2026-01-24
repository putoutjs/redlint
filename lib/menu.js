export const SCAN = '🔍 scan';
export const SCAN_DEBUG = '🔍 scan: debug';
export const VIEW = '🔮 view';
export const BUNDLE_DEBUG = '🧺 bundle';
export const FIX = '🔨 fix';
export const EDIT = '🪶 edit';
export const FIX_DEBUG = '🔨 fix: debug';
export const PACK = '🔬 pack';
export const PACK_DEBUG = '🔬 pack: debug';
export const EXTRACT = '🔭 extract';
export const EXTRACT_DEBUG = '🔭 extract: debug';
export const GENERATE = `🐊 generate '.filesystem.json'`;
export const GENERATE_SIMPLE = `🐊 generate simple '.filesystem.json'`;
export const HELP = '︖ help';
export const VERSION = '📦 version';
export const TEST = '📼 test';
export const DEBUG = '🔧 debug';
export const CONVERT = '🐌 convert';
export const RENAME = '🦔 rename';
export const BACK = '🔙 back';
export const EXIT = '🚪 exit';

export const CONVERT_RC_TO_FLAT = '⏣ convert ESLint RC to Flat Config';
export const CONVERT_JS_TO_JSON = '🦏 convert js to json';
export const CONVERT_JS_TO_JSON_DEBUG = '🦏 convert js to json: debug';
export const CONVERT_JSON_TO_JS = '🦏 convert json to js';
export const CONVERT_JSON_TO_JS_DEBUG = '🦏 convert json to js: debug';

export const RENAME_JS_TO_JSX = '🦏 rename js to jsx';
export const RENAME_JS_TO_JSX_DEBUG = '🦏 rename js to jsx: debug';

export const RENAME_JSX_TO_JS = '🦏 rename jsx to js';
export const RENAME_JSX_TO_JS_DEBUG = '🦏 rename jsx to js: debug';
export const isScan = (a) => a === SCAN || a === 'scan';
export const isScanDebug = (a) => a === SCAN_DEBUG || a === 'scan:debug';
export const isBundleDebug = (a) => a === BUNDLE_DEBUG || a === 'bundle:debug';
export const isFix = (a) => a === FIX || a === 'fix';
export const isFixDebug = (a) => a === FIX_DEBUG || a === 'fix:debug';
export const isPack = (a) => a === PACK || a === 'pack';
export const isPackDebug = (a) => a === PACK_DEBUG || a === 'pack:debug';
export const isExtract = (a) => a === EXTRACT || a === 'extract';
export const isExtractDebug = (a) => a === EXTRACT_DEBUG || a === 'extract:debug';
export const isGenerate = (a) => a === GENERATE || a === 'generate';
export const isGenerateSimple = (a) => a === GENERATE_SIMPLE || a === 'generate:simple';
export const isHelp = (a) => a === HELP || a === 'help';
export const isVersion = (a) => a === VERSION || a === 'version' || a === '-v';
export const isTest = (a) => a === TEST || a === 'test';
export const isDebug = (a) => a === DEBUG || a === 'debug';
export const isBack = (a) => a === BACK || a === 'back';
export const isExit = (a) => a === EXIT || a === 'exit';
export const isConvert = (a) => a === CONVERT || a === 'convert';
export const isRename = (a) => a === RENAME || a === 'rename';
export const isEdit = (a) => a === EDIT || a === 'edit';
export const isView = (a) => a === VIEW || a === 'view';
export const isConvertChosen = (a) => {
    return [
        CONVERT_JSON_TO_JS,
        CONVERT_JS_TO_JSON,
        CONVERT_RC_TO_FLAT,
    ].includes(a);
};
export const isRenameToJsxChosen = (a) => a === RENAME_JS_TO_JSX;
export const isRenameToJsChosen = (a) => a === RENAME_JSX_TO_JS;
export const isConvertChosenDebug = (a) => a === CONVERT_JS_TO_JSON_DEBUG || a === CONVERT_JSON_TO_JS_DEBUG;

export const isConvertToJson = (a) => a === CONVERT_JS_TO_JSON || a === CONVERT_JS_TO_JSON_DEBUG;
export const isConvertToJs = (a) => a === CONVERT_JSON_TO_JS || a === CONVERT_JSON_TO_JS_DEBUG;
export const isConvertRCToFlat = (a) => a === CONVERT_RC_TO_FLAT;

export const isRenameToJs = (a) => a === RENAME_JS_TO_JSX || a === RENAME_JS_TO_JSX_DEBUG;
export const isRenameToJsx = (a) => a === RENAME_JSX_TO_JS || a === RENAME_JSX_TO_JS_DEBUG;
