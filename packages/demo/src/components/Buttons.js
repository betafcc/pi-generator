import React from 'react'
import './Buttons.css'


export const Play = ({playing, ...props}) =>
  <FaButton faName={playing ? 'pause' : 'play'} {...props} />


export const Step = ({stepping, ...props}) =>
  <FaButton faName={'step-forward'} {...props}/>


export const Reset = props =>
  <FaButton faName={'fast-backward'} {...props}/>


export const Copy = props =>
  <FaButton faName={'files-o'} {...props}/>


const Button = ({
      children,
      className,
      enabled=true,
      ...props
    }) =>
  <button
      className={
        'Button'
        + (className ? ' ' + className : '')
        + (enabled ? ' enabled' : '')
      }
      {...props}
      >
    {children}
  </button>


const FaButton = ({faName, ...props}) =>
  <Button
      {...props}
      >
    <i className={`fa fa-${faName}`} aria-hidden="true"></i>
  </Button>
