/**
 * Created by kisnows on 2016/9/13.
 */
import React from 'react'
import classNames from 'classnames'
import BaseProps from './PropsType'
export interface IconPropsType extends  BaseProps {
  prefixCls?: string;
  className?: string;
}
export default class Icon extends React.Component<IconPropsType,{}> {
  static defaultProps = {
    prefixCls: 'NEUI',
    type: 'tip',
  }

  render () {
    // TODO 抽离出所有项目通用的 Icon，类似 提示、警告、完成、失败等
    const {prefixCls, className, type, ...others} = this.props
    const cls = classNames({
      [`${prefixCls}_icon`]: true,
      [`${prefixCls}_icon_${type}`]: true,
      [className as string]: !!className
    })
    return (
      <i className={cls} {...others} />
    )
  }
}
