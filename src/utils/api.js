const ipcRenderer = window.require('electron').ipcRenderer
import { v4 } from 'node-uuid'

function send(methodName, ...args) {
  methodName = `rpc-${methodName}`
  ipcRenderer.send(methodName, ...args)
  console.info('[send]', methodName, ...args);

  return new Promise(resolve => {
    let method = (event, args) => resolve(args)
    ipcRenderer.once(methodName, method)
  })

}

export const getDatabases = () => send('database-list')

export const getTables = databaseName => send('table-list', databaseName)

export const getRows = (databaseName, tableName) => send('row-list', databaseName, tableName)
