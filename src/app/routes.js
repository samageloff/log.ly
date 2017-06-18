import React from 'react'
import { Router, Redirect, Route, browserHistory } from 'react-router'

import App from 'base/containers/App'
import NoteList from 'app/components/NoteList'
import NoteDetail from 'app/components/NoteDetail'

const Routes = (
  <Route path='/' components={App}>
    <Route path='/notes' components={{main: NoteList}} />
    <Route path='/note/:nid' components={{main: NoteDetail}} />
    <Redirect from='*' to='/' />
  </Route>
)

export default Routes
