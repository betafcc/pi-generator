import React from 'react'
import {connect} from 'react-redux'
import {setResultNode} from '../actions'
import './Result.css'


const Result = ({result, setResultNode, className, ...props}) =>
  <div
      className={"Result" + (className ? ' ' + className : '')}
      ref={n => n && setResultNode(n)}
      {...props}
      >
  {
    result.length > 1 ? result.slice(0, 1) + '.' + result.slice(1) : result
  }
  </div>


export default connect(
  ({result}) => ({result}),

  dispatch => ({
    setResultNode: ref => dispatch(setResultNode(ref))
  })
)(Result)
