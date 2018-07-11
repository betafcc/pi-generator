import nextDigitExecutor from './lib/next-digit.executor'
import {copyElementTextContent} from './lib/util'


export const play = () => async function(dispatch, getState) {
  dispatch({
    type: 'PLAY',
  })

  dispatch({
    type: 'START_WATCH',
    timestamp: Date.now(),
    id: setInterval(_ => dispatch({type: 'UPDATE_WATCH', timestamp: Date.now()}), 250),
  })

  while (getState().playing)
    dispatch(receiveStep(await nextDigitExecutor.nextDigit()))
}



export const pause = () => (dispatch, getState) => {
  clearTimeout(getState().watchId)

  dispatch({
    type: 'PAUSE',
  })

  dispatch({
    type: 'STOP_WATCH',
    timestamp: Date.now(),
  })
}


export const requestStep = () => async function(dispatch) {
  dispatch({
    type: 'REQUEST_STEP'
  })

  dispatch(receiveStep(await nextDigitExecutor.nextDigit()))
}


const receiveStep = digit => ({
  type: 'RECEIVE_STEP',
  stepResult: digit,
})


export const reset = () => dispatch => {
  nextDigitExecutor
    .reset()
    .then(_ => dispatch({
      type: 'RESET',
    }))
}


export const copy = () => (dispatch, getState) => {
  const {resultNode} = getState()

  if (resultNode) {
    copyElementTextContent(getState().resultNode)
    dispatch({type: 'COPY'})

    clearTimeout(getState().notificationId)

    dispatch(showNotification(
      getState().result.length + ' digits copied to the clipboard',
      setTimeout(() => dispatch(hideNotification()), 3000),
    ))
  }
}


export const showNotification = (message, id) => ({
  type: 'SHOW_NOTIFICATION',
  message,
  id,
})


export const hideNotification = () => (dispatch, getState) => {
  clearTimeout(getState().notificationId)

  dispatch({
    type: 'HIDE_NOTIFICATION'
  })
}


export const setResultNode = node => ({
  type: 'SET_RESULT_NODE',
  node,
})
