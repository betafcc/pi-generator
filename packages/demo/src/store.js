import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import rootReducer from './reducer'


let middlewares = [thunk]
let composeEnhancers = compose

if (process.env.NODE_ENV === 'development') {
  middlewares = [
    ...middlewares,
    logger,
  ]

  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}


export default createStore(
  rootReducer,
  {
    playing: false,
    startWatchTime: null,
    watchId: null,

    notificationMessage: null,
    showingNotification: false,
    notificationId: null,

    stepping: false,
    resultNode: null,
    result: '',

    timeElapsed: 0,
  },
  composeEnhancers(applyMiddleware(...middlewares)),
)
