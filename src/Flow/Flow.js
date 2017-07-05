/**
 * Created by yanming on 17/6/29.
 */
import React, { PropTypes } from 'react'
import classname from 'classnames'
import {
  Icon
} from '../index'

class FlowItem extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    title: PropTypes.string,
    status: PropTypes.string,
    number: PropTypes.number
  }

  static defaultProps = {
    prefixCls: 'NEUI',
    status: 'wait'
  }

  render() {
    const { prefixCls, title, status, className, number } = this.props

    const cls = classname({
      [`${prefixCls}_flow_item`]: true,
      [`${prefixCls}_flow_item_${status}`]: true,
      [className]: className
    })

    return (
      <div className={cls}>
        <div className={`${prefixCls}_flow_body`}>
          <div className={`${prefixCls}_flow_body_main`}>
            { ['wait', 'process'].indexOf(status) !== -1 &&
            <span className={`${prefixCls}_flow_body_${status}`}>{number}</span>
            }
            { status === 'finish' &&
            <Icon type='success' className={`${prefixCls}_flow_body_${status}`} />
            }
          </div>
          <p className={`${prefixCls}_flow_body_title`}>{ title }</p>
        </div>
        <div className={`${prefixCls}_flow_tail`} />
      </div>
    )
  }
}

export default class Flow extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    current: PropTypes.number,
    direction: PropTypes.string
  }

  static defaultProps = {
    prefixCls: 'NEUI',
    current: 0,
    direction: 'horizontal'
  }

  render() {
    const { className, prefixCls, children, current, direction, ...others } = this.props

    const cls = classname({
      [`${prefixCls}_flow`]: true,
      [`${prefixCls}_flow_vertical`]: direction === 'vertical',
      [className]: className
    })

    return (
      <div className={cls} {...others}>
        {children.map((el, index) => {
          const props = {
            number: index + 1,
            key: el.key || index
          }
          if (index === current) {
            props.status = 'process'
          } else if (index < current) {
            props.status = 'finish'
          } else {
            props.status = 'wait'
          }
          return React.cloneElement(el, props)
        })}
      </div>
    )
  }
}

Flow.Item = FlowItem
