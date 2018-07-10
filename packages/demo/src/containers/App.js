import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions'

import Controls from './Controls'
import Notification from './Notification'
import Result from './Result'


const App = () =>
  <div className='App'>
    <div className="header">
      <Controls />
      <Notification />
    </div>
    <Result />
  </div>


export default App



/*
const App = ({
      playing,
      stepping,
      resultNode,
      calculatedDigits,
      timeElapsed,
      result,
      notificationMessage,

      togglePlay,
      step,
      reset,
      copy,
      hideNotification,
      setResultNode,
    }) =>
  <div className="App">
    <Header>
      <Hero>π</Hero>

      <Controls>
        <Play
            playing={playing}
            onClick={togglePlay}
            />
        <Step
            stepping={stepping}
            onClick={step}
            />
        <Reset
            onClick={reset}
            />
        <Copy
            onClick={_ => copy(resultNode)}
            />
      </Controls>

      <Stats>
        <CalculatedDigits>{calculatedDigits}</CalculatedDigits>
        <TimeElapsed>{timeElapsed}</TimeElapsed>
      </Stats>
    </Header>

    <Result
        ref={n => setResultNode(n)}
        >
      {result}
    </Result>

    <Notification
        onClick={hideNotification}
        >
      {notificationMessage}
    </Notification>
  </div>


export default connect(
  state => state,

  dispatch => ({
    togglePlay:       () => dispatch(actions.togglePlay()),
    step:             () => dispatch(actions.step()),
    reset:            () => dispatch(actions.reset()),
    copy:             () => dispatch(actions.copy()),
    hideNotification: () => dispatch(actions.hideNotification()),
    setResultNode:     n => dispatch(actions.setResultNode(n)),
  })
)(App)
*/