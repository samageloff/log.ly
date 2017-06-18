// Core
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from 'base/configureStore'
import base from 'app/styles/base'

// Routes
import Routes from 'app/routes'

// Configure Store
const store = configureStore()

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Redirect from='/' to='notes' />
      {Routes}
    </Router>
  </Provider>
), document.getElementById('app'))
