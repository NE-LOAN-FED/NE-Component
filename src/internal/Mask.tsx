import React, { Component } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

export interface MaskProps {
  prefixCls?: string;
  show: boolean;
  backgroundColor?: string;
  onClick?: (e?:any) => void;
}

class Mask extends Component<MaskProps, any> {

  static defaultProps = {
    show: false
  }

  render () {
    const {show, prefixCls, backgroundColor, ...others} = this.props
    const style = {
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      backgroundColor: backgroundColor || 'rgba(0,0,0,0.5)'
    } as React.CSSProperties
    return (
      <TransitionGroup>
        {show &&
        <CSSTransition classNames={'fade'} in={show} timeout={300}>
          <div style={style} {...others} />
        </CSSTransition>
        }
      </TransitionGroup>
    )
  }
}

export default Mask
