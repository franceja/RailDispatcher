const { app, BrowserWindow, webContents , screen} = require('electron')
const path = require('path')
var mainWindow = 0;
var winUpdateID = 0;
var winSimID = 0;
var winMapID= 0;
var latestStation = '';

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

function createSimulation(station){
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  const win = new BrowserWindow({
    width: width,
    height: height,
    resizable: true,
    frame: false,
    icon:'src/img/icon.png',
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js'),
    }
    })

    win.loadURL('file://'+__dirname+'/src/stations/'+station+'.html')
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
    case 'bangkokStn':
      var rand = Math.floor((Math.random() * 3)) + 1;
      event.sender.send('asynReply','<img class="simpics" src="stations/img/bangkok'+rand+'.jpg" width="100%"> This station has been added to this game since April 2021');
      latestStation = 'bangkok';
      break;
    case 'bangsueGrandStn':
      var rand = Math.floor((Math.random() * 2)) + 1;
      event.sender.send('asynReply','<img class="simpics" src="stations/img/bangsueGrand'+rand+'.jpg" width="100%"> This station has been added to this game since April 2021');
      latestStation = 'bangsueGrand';
      break;
    case 'nakhonPathomStn':
      var rand = Math.floor((Math.random() * 1)) + 1;
      event.sender.send('asynReply','<img class="simpics" src="stations/img/nakhonPathom'+rand+'.jpg" width="100%"> This station has been added to this game since April 2021');
        latestStation = 'nakhonPathom';
        break;

    case 'updateStatus':
      var version = app.getVersion();
      console.log(version);
      event.sender.send('asynReply',version);
      break;
    case 'submitSim':
      BrowserWindow.fromId(winSimID).close();
      winMapID = createSimulation(latestStation);
      break;
    
    case 'closeMap':
      console.log(winMapID);
      BrowserWindow.fromId(winMapID).close();
      break;
      
    default:
      break;
  }
})