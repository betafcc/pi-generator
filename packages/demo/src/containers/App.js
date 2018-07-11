import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions'
import './App.css'


import Controls from './Controls'
import Notification from './Notification'
import Result from './Result'
import Hero from '../components/Hero'
import Header from '../components/Header'


const App = () =>
  <div className='App'>
    <Header>
      <Hero>π</Hero>
      <Controls />
      <Notification />
    </Header>
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