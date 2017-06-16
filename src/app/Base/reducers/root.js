import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import Immutable, { Map } from 'immutable'

import {
  REQUEST_APP_DATA,
  RECEIVE_APP_DATA_SUCCESS,
  RECEIVE_APP_DATA_ERROR
} from '../actions/root'

const defaultAppState = Map({
  data: Immutable.fromJS([]),
  error: '',
  isFetching: true
})

const app = (state = defaultAppState, action) => {
  switch (action.type) {
    case REQUEST_APP_DATA:
      return state.withMutations(map => {
        map.set('data', action.data)
        map.set('isFetching', true)
        map.set('error', '')
      })
    case RECEIVE_APP_DATA_SUCCESS:
      return state.withMutations(map => {
        map.set('isFetching', false)
      })
    case RECEIVE_APP_DATA_ERROR:
      return state.withMutations(map => {
        map.set('isFetching', false)
        map.set('error', action.error)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  app,
  routing: routerReducer
})

export default rootReducer
