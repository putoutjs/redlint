const {parse} = JSON;

export const version = async ({log, exit, readFile}) => {
    const packagePath = new URL('../package.json', import.meta.url);
    const packageData = await readFile(packagePath);
    const {version} = parse(packageData);
    
    log(`v${version}`);
    exit();
};
