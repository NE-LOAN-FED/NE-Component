import * as React from 'react'
import { findDOMNode } from 'react-dom'
import classNames from 'classnames'
import Icon from '../Icon'
import BaseProps from './PropsType'

export interface NoticeBarPropsType extends BaseProps {
  prefixCls?: string;
  className?: string;
}

export default class NoticeBar extends React.Component<NoticeBarPropsType, any> {
  static defaultProps = {
    prefixCls: 'NEUI',
    type: '',
    icon: null,
    onClose: () => {},
    onClick: () => {}
  }

  constructor (props) {
    super(props)

    this.state = {}
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose () {
    this.props.onClose()
    let el = findDOMNode(this)
    el && el.parentNode && el.parentNode.removeChild(el)
  }

  render () {
    const {type, icon, prefixCls, className, children, closeIcon, ...others} = this.props
    const cls = classNames({
      [className as string]: !!className,
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
            {closeIcon || <Icon type='close' />}
          </div>
        break
      default:
        iconEle = null
    }

    return (
      <div className={cls}
           onClick={this.props.onClick}
           {...others}
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
