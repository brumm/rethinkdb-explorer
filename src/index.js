import 'css/global'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, hashHistory } from 'react-router'

import App from 'components/App'
import configureStore from './redux/configureStore'
import {
  setWindowState,
  setDatabases,
  setTables,
  setRows
} from 'redux/actions'
import { getDatabases, getTables, getRows } from './utils/api'

const { ipcRenderer } = window.require('electron')
const store = configureStore()

hashHistory.listen(({pathname}) => console.info('[location]', pathname))

ipcRenderer.on('window-blur', () => store.dispatch(
  setWindowState({ isFocused: false })
))
ipcRenderer.on('window-focus', () => store.dispatch(
  setWindowState({ isFocused: true })
))

function loadDatabases() {
  getDatabases().then(databases => store.dispatch(
    setDatabases(databases)
  ))
}

function loadTables({ params: { databaseName }}) {
  getTables(databaseName).then(tables => store.dispatch(
    setTables(tables)
  ))
}

function loadRows({ params: { databaseName, tableName }}) {
  getRows(databaseName, tableName).then(rows => store.dispatch(
    setRows(rows)
  ))
}

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={App} onEnter={loadDatabases}>
        <Route path=':databaseName' onEnter={loadTables}>
          <Route path=':tableName' onEnter={loadRows} />
        </Route>
      </Route>
    </Router>
  </Provider>
  , document.querySelector('#app')
)

ipcRenderer.send('show-window')
