const { BrowserWindow, app, ipcMain, Notification } = require('electron');
const python = require('child_process').spawn('python', ['./hello.py']);
   
const path = require('path');

const isDev = !app.isPackaged;
const NOTIFICATION_TITLE = 'Basic Notification'
const NOTIFICATION_BODY = 'Notification from the Main process'

function showNotification () {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      // preload: path.join(__dirname, 'preload.js')
    }
  })
  python.stdout.on('data',function(data){
    console.log("data: ",data.toString('utf8'));
});

  win.loadFile('index.html');
}

if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
  })
}

ipcMain.on('notify', (_, message) => {
  new Notification({title: 'Notifiation', body: message}).show();
})

app.whenReady().then(createWindow).then(showNotification)