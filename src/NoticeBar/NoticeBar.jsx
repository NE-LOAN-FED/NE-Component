import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import classNames from 'classnames'
import Icon from '../Icon'
export default class NoticeBar extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.handleClose = this.handleClose.bind(this)
  }

  static propTypes = {
    prefixCls: PropTypes.string,
    onClose: PropTypes.func,
    onClick: PropTypes.func,
    children: PropTypes.string,
    icon: PropTypes.element,
    type: PropTypes.oneOf(['link', 'closable', ''])
  }

  static defaultProps = {
    prefixCls: 'NEUI',
    type: '',
    icon: null,
    onClose: () => {},
    onClick: () => {}
  }

  handleClose() {
    this.props.onClose()
    let el = findDOMNode(this)
    el.parentNode.removeChild(el)
  }

  render() {
    const { type, icon, prefixCls, className, children, closeIcon, ...others } = this.props
    const cls = classNames({
      [className]: className,
      [`${prefixCls}_notice_bar`]: true
    })
    let iconEle

    switch (type) {
      case 'link':
        iconEle =
          <div className='tail-icon'>
            <Icon type='arrow' />
          </div>
        break
      case 'closable':
        iconEle =
          <div
            className='tail-icon'
            onClick={this.handleClose}>
            {closeIcon ? closeIcon : <Icon type='close' />}
          </div>
        break
      default:
        iconEle = null
    }

    return (
      <div className={cls}
        onClick={this.props.onClick}
      >
        {icon
          ? <div className='head-icon'>
            {icon}
          </div>
          : null
        }
        <div className='content'>
          {children}
        </div>
        {iconEle}
      </div>
    )
  }
}
