import React from 'react'
import { Router, Redirect, Route, browserHistory } from 'react-router'

import App from 'base/containers/App'
import NoteList from 'app/components/NoteList'

const Routes = (
  <Route path='/' components={App}>
    <Route path='/index' components={{main: NoteList}} />
    <Redirect from='*' to='/' />
  </Route>
)

export default Routes
