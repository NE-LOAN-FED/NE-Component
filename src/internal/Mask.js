import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
class Mask extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    show: PropTypes.bool
  }
  static defaultProps = {
    show: false
  }

  render() {
    const { show, prefixCls, backgroundColor, ...others } = this.props
    const style = {
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      backgroundColor: backgroundColor || 'rgba(0,0,0,0.5)'
    }
    return (
      <TransitionGroup>
        {show &&
          <CSSTransition classNames={'fade'} in={show} timeout={100}>
            <div style={style} {...others} />
          </CSSTransition>
        }
      </TransitionGroup>
    )
  }
}

export default Mask
