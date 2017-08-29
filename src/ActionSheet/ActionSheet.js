/**
 * Created by hzyuanqi1 on 2017/5/26.
 */
import React from 'react'
const PropTypes = React.PropTypes
import classname from 'classnames'
import { ModalHOC } from '../Modal'
const noop = () => { }

class ActionSheet extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    show: PropTypes.bool,       // 显示
    onClose: PropTypes.func, // 关闭动作面板事件
    menus: PropTypes.array,   // 内容列表
    onMenuClick: PropTypes.func, // 选项点击事件
    autoClose: PropTypes.bool,  // 点击一个选项后，是否自动关闭
    showCancel: PropTypes.bool,  // 显示底部取消
    cancelText: PropTypes.string // 取消文本
  }

  static defaultProps = {
    prefixCls: 'NEUI',
    show: false,
    onClose: noop,
    onMenuClick: noop,
    autoClose: true,
    showCancel: false,
    cancelText: '取消',
    menus: []
  }

  handleMenuClick = (key) => {
    const { autoClose, onMenuClick, onClose } = this.props
    autoClose && onClose()
    onMenuClick(key)
  }

  render() {
    const {
      prefixCls, show, menus, className, showCancel, cancelText, title, ...others
    } = this.props
    const cls = classname({
      [`${prefixCls}_action__sheet`]: true,
      [className]: className
    })
    return (
      <ul className={cls}>
        {title ? <li>{title}</li> : null}
        {menus.map((el, index) => {
          return <li key={index} onClick={() => this.handleMenuClick(index)}>{el}</li>
        })}
        {showCancel &&
          <li className={`${prefixCls}_action_cancel`} key={-1} onClick={() => this.handleMenuClick(-1)}>{cancelText}</li>
        }
      </ul>
    )
  }
}
export default ModalHOC({
  transitionName: 'verticalSlideBT'
})(ActionSheet)
