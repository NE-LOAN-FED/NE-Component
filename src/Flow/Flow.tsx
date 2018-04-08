/**
 * Created by yanming on 17/6/29.
 */
import * as React from 'react'
import classnames from 'classnames'
import { Icon } from '../index'
import { FlowItemProps as FlowItemBaseProps, FlowProps as FlowBaseProps } from './PropTypes'

export interface FlowPropsType extends FlowBaseProps {
  prefixCls?: string;
  className?: string;
}

export interface FlowItemPropsType extends FlowItemBaseProps {
  prefixCls?: string;
  className?: string;
}

export class FlowItem extends React.Component<FlowItemPropsType, {}> {
  static defaultProps = {
    prefixCls: 'NEUI',
    status: 'wait'
  }

  render () {
    const {prefixCls, title, status, className, number} = this.props

    const cls = classnames({
      [`${prefixCls}_flow_item`]: true,
      [`${prefixCls}_flow_item_${status}`]: true,
      [className as string]: !!className
    })

    return (
      <div className={cls}>
        <div className={`${prefixCls}_flow_body`}>
          <div className={`${prefixCls}_flow_body_main`}>
            {['wait', 'process'].indexOf(status) !== -1 &&
            <span className={`${prefixCls}_flow_body_${status}`}>{number}</span>
            }
            {status === 'finish' &&
            <Icon type='success' className={`${prefixCls}_flow_body_${status}`} />
            }
          </div>
          <p className={`${prefixCls}_flow_body_title`}>{title}</p>
        </div>
        <div className={`${prefixCls}_flow_tail`} />
      </div>
    )
  }
}

export default class Flow extends React.Component<FlowPropsType, {}> {

  static defaultProps = {
    prefixCls: 'NEUI',
    current: 0,
    direction: 'horizontal',
    children: []
  }
  static Item = FlowItem

  render () {
    const {className, prefixCls, children, current, direction, ...others} = this.props

    const cls = classnames({
      [`${prefixCls}_flow`]: true,
      [`${prefixCls}_flow_vertical`]: direction === 'vertical',
      [className as string]: !!className
    })

    return (
      <div className={cls} {...others}>
        {
          React.Children.map(children, (el, index) => {
            const props = {
              number: index + 1,
              key: (typeof el !== 'string' && typeof el !== 'number' && el.key) || index,
              status: ''
            }
            if (index === current) {
              props.status = 'process'
            } else if (index < current) {
              props.status = 'finish'
            } else {
              props.status = 'wait'
            }
            return React.cloneElement(el as React.ReactElement<any>, props)
          })
        }
      </div>
    )
  }
}
