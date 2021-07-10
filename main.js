const { BrowserWindow, app, ipcMain, Notification } = require('electron');
const _path = app.getAppPath()

const python = require('child_process').spawn('python', [_path+'/hello.py']);
// const {exec} = require('child_process');
// exec("sh ./hello.py", () => {})
   
const path = require('path');
const { fs } = require('fs')

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


const isDev = !app.isPackaged;
const height = 70
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
    frame: false,
    backgroundColor: "#424141",
    webPreferences: {
      nodeIntegration: true,
      worldSafeExecuteJavaScript: true,
      contextIsolation: false,
      // preload: path.join(__dirname, 'preload.js')
    }
  })
  var python = require('child_process').spawn('sh', [path.join(__dirname, 'python.sh')]);
  //   python.stdout.on('data',function(data){
  //       console.log("data: ",data.toString('utf8'));
  //   });


  win.loadFile(path.join(__dirname, 'index.html'));
}


ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg)

  if (fs.existsSync(_path+'/hello.py')) {
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