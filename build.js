const builder = require('electron-builder');
const Platform = builder.Platform;

builder.build({
    targets: Platform.WINDOWS.createTarget(),
    config: {
        appId: 'yiyi',
        productName: 'GTFOBins',
        win: {
            target: [{
                target: 'nsis',
                arch: ['x64']
            }]
        },
        nsis: {
            oneClick: true,
            perMachine: false,
            allowToChangeInstallationDirectory: false,
            createDesktopShortcut: true,
            runAfterFinish: true
        },
        asar: true
    }
}).then(() => {
    console.log('构建完成！');
}).catch((error) => {
    console.error('构建失败:', error);
}); 