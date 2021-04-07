const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 600,
    height: 300,
    resizable: false,
    backgroundColor: '#2e2c29',
    frame: false,
    icon:'src/img/icon.png',
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js'),
    }
  })

  //win.openDevTools();
  //win.loadFile('index.html');
  win.loadURL('file://'+__dirname+'/index.html')
  win.on('closed', function () {
    mainWindow = null
  })
  
  //const contents = win.webContents
  //console.log(contents) 
}

app.on('ready', createWindow)
app.on('window-all-closed', function () {
 if (process.platform !== 'darwin') {
  app.quit()
 }
})

app.on('activate', function () {
 if (mainWindow === null) {
  createWindow()
 }
})

const ipc = require('electron').ipcMain;

ipc.on('aSynMessage', (event, args) => {
 console.log(args);
 if(args == 'close'){
  app.quit()
 }
})