import React from 'react'
import './Hero.css'


const Hero = ({children, className, ...props}) =>
  <div
      className={'Hero' + (className ? ' ' + className : '')}
      >
  {
    children
  }
  </div>


export default Hero
