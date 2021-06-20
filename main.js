const { BrowserWindow, app, ipcMain, Notification } = require('electron');
// const python = require('child_process').spawn('python', ['./hello.py']);
// const {exec} = require('child_process');
// exec("sh ./hello.py", () => {})
   
const path = require('path');

const isDev = !app.isPackaged;


function createWindow() {
  const win = new BrowserWindow({
    width: 500,
    height: 120,
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

  const testWin = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "#424141",
    webPreferences: {
      nodeIntegration: true,
      worldSafeExecuteJavaScript: true,
      contextIsolation: false,
      // preload: path.join(__dirname, 'preload.js')
    }
  })

  testWin.loadFile(path.join(__dirname, 'index.html'));

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