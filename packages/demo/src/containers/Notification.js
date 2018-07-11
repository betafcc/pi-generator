import React from 'react'
import {connect} from 'react-redux'
import {hideNotification} from '../actions'
import './Notification.css'


const Notification = ({
      showingNotification,
      notificationMessage,

      hideNotification,
    }) =>
  <div
      className={"Notification" + (showingNotification ? ' Notification--visible' : '')}
      onClick={hideNotification}
      >
    <div className="Notification__Icon">
      <i className="fa fa-bell-o"></i>
    </div>
    <div className="Notification__Message">{notificationMessage}</div>
  </div>



export default connect(
  state => state,

  dispatch => ({
    hideNotification: () => dispatch(hideNotification())
  })
)(Notification)
