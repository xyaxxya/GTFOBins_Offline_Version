var { app, BrowserWindow, ipcMain } = require('electron');
var path = require('path');
var url = require('url');

var win;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1200,
        height: 800,
        frame: false,  // 无边框窗口
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    // 取消默认全屏
    // win.setFullScreen(true);


    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));


    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', () => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

// 监听窗口控制命令
ipcMain.on('window-controls', (event, command) => {
    const window = BrowserWindow.fromWebContents(event.sender);

    if (command === 'minimize') {
        window.minimize();
    } else if (command === 'maximize') {
        if (window.isMaximized()) {
            window.unmaximize();
        } else {
            window.maximize();
        }
    } else if (command === 'close') {
        window.close();
    }
});
