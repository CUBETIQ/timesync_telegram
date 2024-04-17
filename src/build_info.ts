import fs from 'fs';

interface BuildInfo {
    version: string;
    commit: string;
    build_time: string;
}

// Load the build.json to BuildInfo
const buildFilePath = `${__dirname}/build.json`;
let buildInfo: BuildInfo | null = null;
if (fs.existsSync(buildFilePath)) {
    try {
        const buildPath = require.resolve(buildFilePath);
        buildInfo = require(buildPath);
    } catch (error) {
        console.log('Failed to load build.json', error);
    }
}

if (buildInfo) {
    console.log(`[TimeSyncTelegram] Version: ${buildInfo.version}, Commit: ${buildInfo.commit}, Build Time: ${buildInfo.build_time}`);
} else {
    buildInfo = {
        version: 'dev',
        commit: '-',
        build_time: '-',
    };
}

export default buildInfo;