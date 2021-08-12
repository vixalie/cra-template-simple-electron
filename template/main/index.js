const { app, BrowserWindow } = require('electron');
const path = require('path');
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

const isDev = process.env.NODE_ENV === 'development';

function createWindow() {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      nodeIntegrationInSubFrames: true,
      enableRemoteModule: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  if (isDev) {
    installExtension([REACT_DEVELOPER_TOOLS])
      .then(() => {
        mainWindow.loadURL('http://localhost:3000');
        mainWindow.webContents.openDevTools();
      })
      .catch(err => console.log('An error occurred: ', err));
  } else {
    mainWindow.loadFile(path.join('build', 'index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
