import React, {Component} from 'react'
import {connect} from 'react-redux'
import {saveProgress, loadProgress} from '../actions'
import './App.css'

import Header from '../components/Header'
import Hero from '../components/Hero'
import Controls from './Controls'
import Stats from './Stats'
import Notification from './Notification'
import Result from './Result'


class App extends Component {
  componentWillMount = () => {
    this.props.loadProgress()
    this.saveIntervalId = setInterval(() => this.props.saveProgress(), 3000)
  }

  componentWillUnmount = () => {
    clearInterval(this.saveIntervalId)
  }

  render = () =>
  <div className='App'>
    <Header>
      <Hero>π</Hero>
      <Controls />
      <Stats />
      <Notification />
    </Header>
    <Result />
  </div>
}


export default connect(
  state => ({}),
  dispatch => ({
    loadProgress: () => dispatch(loadProgress()),
    saveProgress: () => dispatch(saveProgress()),
  })
)(App)
