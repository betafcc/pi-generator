import React from 'react'
import {connect} from 'react-redux'
import {Play, Step, Reset, Copy} from '../components/Buttons'
import {play, pause, step, requestStep, reset, copy} from '../actions'
import './Controls.css'


const Controls = ({
      playing,
      stepping,      

      play,
      pause,
      requestStep,
      reset,
      copy,
    }) =>
  <div className="Controls">
    <Play
        onClick={playing ? pause : play}
        playing={playing}
        />
    <Step
        onClick={requestStep}
        enabled={stepping ? false : true}
        />
    <Reset
        onClick={reset}
        />
    <Copy
        onClick={copy}
        />
  </div>


export default connect(
  state => state,

  dispatch => ({
    play: () => dispatch(play()),
    pause: () => dispatch(pause()),
    requestStep: () => dispatch(requestStep()),
    reset: () => dispatch(reset()),
    copy: () => dispatch(copy()),
  }),
)(Controls)
