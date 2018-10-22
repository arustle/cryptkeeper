const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const { ipcRenderer, ipcMain, webContents } = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let coinigyWindow;


// const db = require('./database/models');
// global.db = db;

// exports.db = db;
// exports.Portfolios = db.Portfolios.findAll().then(x => (x));
// db.Portfolios.findAll().then(x => (x));
exports.withRendererCallback = mapper => [1, 2, 3].map(mapper);

exports.withLocalCallback = () => [1, 2, 3].map(x => x + 1);


function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    webPreferences: { webSecurity: false },
    width: 1000,
    height: 1400,
  });

  coinigyWindow = new BrowserWindow({
    webPreferences: { webSecurity: false },
    width: 1600,
    height: 1200,
  });


  // and load the index.html of the app.
  mainWindow.loadURL('http://localhost:8092/index.html');
  mainWindow.webContents.openDevTools();
  coinigyWindow.loadURL('http://localhost:8092/coinigy.html');
  // mainWindow.loadURL(url.format({
  //   pathname: path.join(__dirname, 'app/index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  ipcMain.on('update-coinigy-data', (e, payload) => {
    // coinigyWindow.webContents.send('change-coinigy-data', payload);
    console.log(payload);
    coinigyWindow.webContents.send('change-coinigy-page', payload)

    // coinigyWindow.webContents.executeJavaScript(
    //   `console.log('$', $);$('a.market_list_entry[data-exchange="${payload.exchange}"][data-displayname="${payload.pairA}/${payload.pairB}"]').click()`,
    //   false,
    // )
    //   .then((result) => {
    //     console.log(result); // Will be the JSON object from the fetch call
    //   });
    // coinigyWindow.webContents.executeJavaScript(
    //   `console.log('#exchange_${payload.exchange}');` +
    //   `document.querySelector('#exchange_${payload.exchange}').click();` +
    //   `console.log('a.market_list_entry[data-exchange="${payload.exchange}"][data-displayname="${payload.pairA}/${payload.pairB}"]');` +
    //   `document.querySelector('a.market_list_entry[data-exchange="${payload.exchange}"][data-displayname="${payload.pairA}/${payload.pairB}"]').click()`,
    //   false,
    // )
    //   .then((result) => {
    //     console.log(result); // Will be the JSON object from the fetch call
    //   });
  });
  coinigyWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    coinigyWindow = null;
  });

  coinigyWindow.on('resize', () => {
    const [width, height] = coinigyWindow.getContentSize();
    for (const wc of webContents.getAllWebContents()) {
      // Check if `wc` belongs to a webview in the `win` window.
      if (wc.hostWebContents &&
        wc.hostWebContents.id === coinigyWindow.webContents.id) {
        wc.setSize({
          normal: {
            width,
            height,
          },
        });
      }
    }
  });

  //
  // coinigyWindow.webContents.on('did-finish-load', () => {
  //   coinigyWindow.webContents.send('message', 'Hello second window!');
  // });
  //
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
