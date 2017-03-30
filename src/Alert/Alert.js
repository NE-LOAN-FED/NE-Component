import React from 'react'
import Modal from '../Modal'
const PropTypes = React.PropTypes

const noop = () => { }

function AlertContent ({prefixCls, className, children, handleModalClose}) {
  return (
    <div className={`${prefixCls}_modal ${className || ''}`}>
      <div className={`${prefixCls}_modal_body`}>
        {children || null}
      </div>
      <div className={`${prefixCls}_modal_close`} onClick={handleModalClose}>
        <i className={`${prefixCls}_modal_icon ${prefixCls}_modal_icon_close`} />
      </div>
    </div>
  )
}

export default class Alert extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,  // 添加modal class
    show: PropTypes.bool,       // modal 显示
    onClose: PropTypes.func,  // modal close 事件
    transitionName: PropTypes.string, // 动画的类名
    transitionTimeOut: PropTypes.number // 动画的时间
  }

  static defaultProps = {
    prefixCls: 'NEUI',
    show: false,
    onClose: noop,
    transitionName: 'floatLayer'
  }
  render() {
    const { prefixCls, className, children, onClose, show, transitionName, transitionTimeOut } = this.props
    return (
      <Modal show={show} transitionName={transitionName} onClose={onClose} transitionTimeOut={transitionTimeOut} >
        <AlertContent prefixCls={prefixCls} className={className} children={children} />
      </Modal>
    )
  }
}
