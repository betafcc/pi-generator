import React from 'react'
import {connect} from 'react-redux'
import {setResultNode} from '../actions'
import './Result.css'


const Result = ({result}) =>
  <div className="Result">
  {result}
  </div>


export default connect(
  state => state,

  dispatch => ({
    setResultNode: ref => setResultNode(ref)
  })
)(Result)
