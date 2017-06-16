import data from 'app/data.json'

export const REQUEST_APP_DATA = 'REQUEST_APP_DATA'
export const RECEIVE_APP_DATA_SUCCESS = 'RECEIVE_APP_DATA_SUCCESS'
export const RECEIVE_APP_DATA_ERROR = 'RECEIVE_APP_DATA_ERROR'

const requestAppData = (data) => {
  return {
    type: REQUEST_APP_DATA,
    data
  }
}

const receiveAppDataSuccess = () => {
  return {
    type: RECEIVE_APP_DATA_SUCCESS
  }
}

const receiveAppDataError = (error) => {
  return {
    type: RECEIVE_APP_DATA_ERROR,
    error
  }
}

export const fetchAppData = () => {
  return (dispatch) => {
    dispatch(requestAppData(data))
  }
}
