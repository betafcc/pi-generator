export default (state, action) => {
  switch (action.type) {
    case 'PLAY': return {
      ...state,
      playing: true,
      stepping: true,
    }
    case 'PAUSE': return {
      ...state,
      playing: false,
      stepping: false,
    }
    case 'REQUEST_STEP': return {
      ...state,
      stepping: true
    }
    case 'RECEIVE_STEP': return {
      ...state,
      stepping: state.playing,
      result: state.result + action.stepResult,
      timeElapsed: state.timeElapsed + action.stepElapsed,
    }
    case 'RESET': return {
      ...state,
      result: '',
    }

    case 'COPY': return state

    case 'SHOW_NOTIFICATION': return {
      ...state,
      notificationMessage: action.message,
      notificationId: action.id,
      showingNotification: true,
    }
    case 'HIDE_NOTIFICATION': return {
      ...state,
      showingNotification: false,
    }

    case 'SET_RESULT_NODE': return {
      ...state,
      resultNode: action.node,
    }

    default: return state
  }
}
