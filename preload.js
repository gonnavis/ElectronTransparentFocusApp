const { contextBridge, ipcRenderer } = require('electron');

// Expose the `toggleIgnoreMouseEvents` function to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  enableIgnoreMouseEvents: () => {
    ipcRenderer.send('enableIgnoreMouseEvents');
  },
  disableIgnoreMouseEvents: () => {
    ipcRenderer.send('disableIgnoreMouseEvents');
  },
});
