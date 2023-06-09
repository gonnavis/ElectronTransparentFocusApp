const { app, BrowserWindow, ipcMain, desktopCapturer } = require('electron');
const path = require('path');

let mainWindow;

async function getCaptureWindowSources() {
  let sources = await desktopCapturer.getSources({
      types: ['window'],
      thumbnailSize: {
          width: 0,
          height: 0,
      },
  });

  sources = sources.map(source => {
      const { id, name } = source;
      return { id, name };
  });
  console.log('--- sources', sources);
  return sources;
};

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    alwaysOnTop: true,
    transparent: true,
    frame: false,
    acceptFirstMouse: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  // mainWindow.setIgnoreMouseEvents(true); // Enable mouse events for the transparent areas
  mainWindow.setIgnoreMouseEvents(true, { forward: true });
  // mainWindow.setHasShadow(false); // Optional: Remove shadow to make the window blend in

  mainWindow.loadFile('index.html');

  // Other window configuration and event handling
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
  
  ipcMain.on('enableIgnoreMouseEvents', () => {
    mainWindow.setIgnoreMouseEvents(true, { forward: true });
  });
  ipcMain.on('disableIgnoreMouseEvents', () => {
    mainWindow.setIgnoreMouseEvents(false);
  });

  setInterval(() => {
    getCaptureWindowSources();
  }, 1000);
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
