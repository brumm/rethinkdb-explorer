
import {
  app,
  BrowserWindow,
  Menu,
  ipcMain
} from 'electron'
import windowStateKeeper from 'electron-window-state'
import {
  connect,
  dbList,
  db,
  table,
  tableList,
} from 'rethinkdb'

import template from './menu-template.js'

const { DEV, PORT = '8080' } = process.env
const windowUrl = DEV
  ? `http://0.0.0.0:${PORT}/`
  : 'file://' + __dirname + '/index.html'

let mainWindow

function createWindow () {
  let mainWindowState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 600
  });

  mainWindow = new BrowserWindow({
    width: mainWindowState.width,
    height: mainWindowState.height,
    x: mainWindowState.x,
    y: mainWindowState.y,
    minWidth: 1000,
    minHeight: 600,
    titleBarStyle: 'hidden-inset',
    webPreferences: {
      webSecurity: false
    },
    show: false
  })

  mainWindowState.manage(mainWindow)
  mainWindow.loadURL(windowUrl)

  ipcMain.on('show-window', () => {
    mainWindow.show()
    if (DEV) mainWindow.webContents.openDevTools()
  })

  mainWindow.on('blur', () => mainWindow.webContents.send('window-blur'))
  mainWindow.on('focus', () => mainWindow.webContents.send('window-focus'))
  mainWindow.on('closed', () => mainWindow = null)

  function on(methodName, callback) {
    methodName = `rpc-${methodName}`
    ipcMain.on(methodName, (event, ...args) => {
      console.info('[on]', methodName, ...args);
      const send = data => event.sender.send(methodName, data)
      callback(send, ...args)
    })
  }

  connect((error, connection) => {

    if (error) {
    } else {

      on('database-list', send => (
        dbList().run(connection).then(send)
      ))

      on('table-list', (send, databaseName) => (
          db(databaseName).tableList().run(connection).then(send)
      ))

      on('row-list', (send, databaseName, tableName) => (
          db(databaseName)
          .table(tableName)
          .run(connection)
          .then(cursor => cursor.toArray())
          .then(send)
      ))

    }
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

process.on('uncaughtException', ::console.log)
