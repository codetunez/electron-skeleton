'use strict';

var express = require('express');
var bodyParser = require('body-parser')

var webApp = express();
var expressApp = express();

expressApp.use(bodyParser.json());
var router = express.Router();

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {

  weApp.listen(4000);
  expressApp.listen(4001);
  console.log("Express app static listening on: 4000");
  console.log("Express app listening on: 4001");
  
  mainWindow = new BrowserWindow({ width: 1024, height: 768 });
  mainWindow.loadURL('http://127.0.0.1:4000/index.html');
  console.log("Ready");
  
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}


/* EXPRESS STATICS */

webApp.use(express.static(__dirname + '/app'));
webApp.use('/build', express.static(__dirname + '/build'));
webApp.use('/node_modules', express.static(__dirname + '/node_modules'));

/* EXPRESS WEB API */

// CORS bypass: not production code
expressApp.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

expressApp.get('/api/ping', function (req, res) {
  res.json({ 'ping': 'ok' });
});


/* ELECTRON */
app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
