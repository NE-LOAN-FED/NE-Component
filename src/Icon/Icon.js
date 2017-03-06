/**
 * Created by hzyuanqi1 on 2016/9/13.
 */
import React from 'react'
import classNames from 'classnames'

const PropTypes = React.PropTypes

export default class Icon extends React.Component {

  static propTypes = {
    prefixCls: PropTypes.string,
    type: PropTypes.oneOf(['tip','loading','del','arrow','tick','wait','close','wait','warning','success'])
  }

  static defaultProps = {
    prefixCls: 'NEUI',
    type: 'tip'
  }

  render() {
    // TODO 抽离出所有项目通用的 Icon，类似 提示、警告、完成、失败等
    const {prefixCls, className, type, ...others} = this.props
    const cls = classNames({
      [`${prefixCls}_icon`]: true,
      [`${prefixCls}_icon_${type}`]: true,
      [className]: className
    })
    return (
      <i className={cls} {...others} />
    )
  }
}
