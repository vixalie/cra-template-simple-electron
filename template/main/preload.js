const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  test: () => console.log('context bridge test.')
});
