import React from 'react'
import {connect} from 'react-redux'
import './Stats.css'

import {formatTimeDuration} from '../lib/util'


const Stats = ({totalDigits=100, timeElapsed=0, className, ...props}) =>
  <div
      className={"Stats" + (className ? ' ' + className : '')}
      {...props}
      >
    <TotalDigits totalDigits={totalDigits} />
    <TimeElapsed timeElapsed={timeElapsed} />
  </div>


const TotalDigits = ({totalDigits, className, ...props}) =>
  <div
      className={"TotalDigits" + (className ? ' ' + className : '')}
      {...props}
      >
    {totalDigits.toLocaleString()} digits calculated
  </div>


const TimeElapsed = ({timeElapsed, className, ...props}) =>
  <div
      className={"TimeElapsed" + (className ? ' ' + className : '')}
      {...props}
      >
    {formatTimeDuration(timeElapsed)} elapsed
  </div>


export default connect(
  ({timeElapsed, result: {length : totalDigits}}) => ({
    timeElapsed,
    totalDigits,
  }),
  dispatch => ({}),
)(Stats)
