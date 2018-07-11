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
    }
    case 'RESET': return {
      ...state,
      result: '',
      timeElapsed: 0,
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

    case 'START_WATCH': return {
      ...state,
      watchId: action.id,
      startWatchTime: action.timestamp,
    }

    case 'UPDATE_WATCH': return {
      ...state,
      startWatchTime: action.timestamp,
      timeElapsed: state.timeElapsed + action.timestamp - state.startWatchTime,
    }

    case 'STOP_WATCH': return {
      ...state,
      watchId: null,
      startWatchTime: null,
      timeElapsed: state.timeElapsed +  action.timestamp - state.startWatchTime,
    }

    case 'LOAD_PROGRESS': return {
      ...state,
      result: action.result,
      timeElapsed: action.timeElapsed,
    }

    default: return state
  }
}
