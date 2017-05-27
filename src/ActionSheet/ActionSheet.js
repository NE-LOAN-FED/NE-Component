/**
 * Created by hzyuanqi1 on 2017/5/26.
 */
import React from 'react'
const PropTypes = React.PropTypes
import classname from 'classnames'
import Modal from '../Modal'
const noop = () => { }

export default class ActionSheet extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    show: PropTypes.bool,       // modal 显示
    onClose: PropTypes.func,  // modal close 事件
    items: PropTypes.array,   // 内容列表
    autoClose: PropTypes.bool,  // 点击一个选项后，是否自动关闭
    transitionName: PropTypes.string, // 动画的类名
    transitionTimeOut: PropTypes.number // 动画的时间
  }

  static defaultProps = {
    prefixCls: 'NEUI',
    show: false,
    onClose: noop,
    autoClose: true,
    transitionName: 'verticalSlideBT',
    transitionTimeOut: 300,
    items: []
  }

  render () {
    const {
      prefixCls, items, className, show, onClose, autoClose, transitionName, transitionTimeOut, ...others
    } = this.props
    const cls = classname({
      [`${prefixCls}_action__sheet`]: true,
      [className]: className
    })
    return (
      <Modal show={show} transitionName={transitionName} transitionTimeOut={transitionTimeOut} onClickAway={onClose}>
        <ul className={cls} {...others}>
          {items.map((el, index) => {
            return <li key={index}>{el}</li>
          })}
        </ul>
      </Modal>
    )
  }
}
