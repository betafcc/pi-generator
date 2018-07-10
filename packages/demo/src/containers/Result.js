import React from 'react'
import {connect} from 'react-redux'
import {setResultNode} from '../actions'
import './Result.css'


const Result = ({result, setResultNode}) =>
  <div className="Result" ref={n => n && setResultNode(n)}>
  {result}
  </div>


export default connect(
  state => state,

  dispatch => ({
    setResultNode: ref => dispatch(setResultNode(ref))
  })
)(Result)
