import nextDigitExecutor from './lib/next-digit.executor'
import {copyElementTextContent} from './lib/util'


export const play = () => async function(dispatch, getState) {
  dispatch({type: 'PLAY'})

  while (getState().playing)
    dispatch(receiveStep(await nextDigitExecutor.nextDigit()))
}



export const pause = () => (dispatch, getState) => {
  clearTimeout(getState().playingId)

  dispatch({
    type: 'PAUSE'
  })
}


export const requestStep = () => async function(dispatch) {
  dispatch({
    type: 'REQUEST_STEP'
  })

  dispatch(receiveStep(await nextDigitExecutor.nextDigit()))
}


const receiveStep = r => ({
  type: 'RECEIVE_STEP',
  stepResult: r,
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
