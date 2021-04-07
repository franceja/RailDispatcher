const { app, BrowserWindow, webContents } = require('electron')
const path = require('path')
var mainWindow = 0;
var winUpdateID = 0;
var winSimID = 0;

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
  return win.id;
}

function createUpdateWindow(){
  const win = new BrowserWindow({
    width: 600,
    height: 300,
    resizable: false,
    frame: false,
    icon:'src/img/icon.png',
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js'),
    }
    })

    win.loadURL('file://'+__dirname+'/src/update.html')
    win.on('closed', function () {
      mainWindow = null
    })
    return win.id;
}

function createSimWindow(){
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    frame: false,
    icon:'src/img/icon.png',
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js'),
    }
    })

    win.loadURL('file://'+__dirname+'/src/simulation.html')
    win.on('closed', function () {
      mainWindow = null
    })
    return win.id;
}

app.on('ready',createWindow)

app.on('window-all-closed', function () {
 if (process.platform !== 'darwin') {
  app.quit()
 }
})

app.on('activate', function () {
 if (mainWindow === null) {
  winMainID = createWindow();
 }
})

const ipc = require('electron').ipcMain;

ipc.on('aSynMessage', (event, args) => {
  console.log(args);

  switch (args) {
    case 'close':
      app.quit()
      break;
    
    case 'update':
      winUpdateID = createUpdateWindow();
      //console.log(winUpdateID);
      break;
    
    case 'updateClose':
      //console.log(winUpdateID);
      //app.quit()
      BrowserWindow.fromId(winUpdateID).close();
      break;
    
    case 'startSim':
      winSimID = createSimWindow();
      
      break;
    case 'closeSim':
      BrowserWindow.fromId(winSimID).close();
      break;

    default:
      break;
  }
})