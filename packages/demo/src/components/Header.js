import React from 'react'
import './Header.css'


const Header = ({children, className, ...props}) =>
  <div
      className={'Header' + (className ? ' ' + className : '')}
      {...props}
      >
  {
    children
  }
  </div>


export default Header
