const { BrowserWindow, app, ipcMain, Notification } = require('electron');


const _path = app.getAppPath()

const {exec} = require('child_process');
   
const path = require('path');

async function exists (path) {  
  try {
    console.log(path)
    await console.log(Fs.access(path))
    return true
  } catch {
    return false
  }
}

console.log('Your App Path:' + _path)
const child = exec(_path+'/oossai',
  function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
           console.log('exec error: ' + error);
      }
  });


const isDev = !app.isPackaged;
const height = 80
const width = 500


function createWindow() {
  const win = new BrowserWindow({
    width: width,
    height: height,
    minWidth: width,
    maxWidth: width,
    minHeight: height,
    maxHeight: height,
    transparent: true, 
    icon: path.join(__dirname, 'logo.png'),
    frame: false,
    backgroundColor: "#424141",
    webPreferences: {
      nodeIntegration: true,
      worldSafeExecuteJavaScript: true,
      contextIsolation: false,
      // preload: path.join(__dirname, 'preload.js')
    }
  })


  win.loadFile(path.join(__dirname, 'index.html'));
}


ipcMain.on('asynchronous-message', (event, arg) => {
  if (exists(_path+'/oosasai')) {
    console.log('exists')
  } else {
    console.log('does not')
  }



  
  event.sender.send('rec_reply', "async pong")

  // const testWin = new BrowserWindow({
  //   width: 1200,
  //   height: 800,
  //   transparent: true, 
  //   frame: false,
  //   // backgroundColor: "#424141",
  //   backgroundColor: "white",
  //   webPreferences: {
  //     nodeIntegration: true,
  //     worldSafeExecuteJavaScript: true,
  //     contextIsolation: false,
  //     // preload: path.join(__dirname, 'preload.js')
  //   }
  // })

  // testWin.loadFile(path.join(__dirname, 'index.html'));

  // Event emitter for sending asynchronous messages
  // event.sender.send('asynchronous-reply', 'async pong')
})


if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
  })
}

ipcMain.on('notify', (_, message) => {
  new Notification({title: 'Notifiation', body: message}).show();
})

app.whenReady().then(createWindow)