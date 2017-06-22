import React from 'react'
const PropTypes = React.PropTypes
import classname from 'classnames'
import Modal from '../Modal'

const noop = () => { }

class Dialog extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    show: PropTypes.bool,       // dialog 显示
    onConfirm: PropTypes.func,  // dialog confirm 事件
    onCancel: PropTypes.func,   // dialog cancel 事件
    headerContent: PropTypes.node, // 头部内容
    confirmContent: PropTypes.node, // 确认内容
    cancelContent: PropTypes.node,  // 取消内容
    prepareStyle: PropTypes.any,         // 需要覆盖 Modal 的样式
    transitionName: PropTypes.string, // 动画的类名
    transitionTimeOut: PropTypes.number // 动画的时间
  }

  static defaultProps = {
    prefixCls: 'NEUI',
    show: false,
    onConfirm: noop,
    onCancel: noop,
    prepareStyle: {
      zIndex: 900
    },
    transitionName: 'verticalSlideTB',
    transitionTimeOut: 300
  }
  render() {
    const { prefixCls, confirmContent, headerContent, onConfirm, onCancel, cancelContent, className, show, transitionName, transitionTimeOut, prepareStyle, ...others } = this.props
    const confirmEle = confirmContent ? <button onClick={onConfirm} className={`${prefixCls}_dialog_confirm_button`}>{confirmContent}</button> : null
    const cancelEle = cancelContent ? <button onClick={onCancel} className={`${prefixCls}_dialog_cancel_button`}>{cancelContent}</button> : null
    const header = headerContent ? (
      <div className={`${prefixCls}_dialog_header`}>
        <h4 className={`${prefixCls}_dialog_header_content`}>
          {headerContent}
        </h4>
      </div>
    ) : null
    const content = this.props.children ? (
      <div className={`${prefixCls}_dialog_content`}>
        {this.props.children}
      </div>
    ) : null
    const cls = classname({
      [`${prefixCls}_dialog`]: true,
      [className]: className
    })
    return (
      <Modal show={show} transitionName={transitionName} transitionTimeOut={transitionTimeOut} prepareStyle={prepareStyle}>
        <div className={cls} {...others}>
          {header}
          {content}
          <div className={`${prefixCls}_dialog_confirm_box`}>
            {cancelEle}
            {confirmEle}
          </div>
        </div >
      </Modal>
    )
  }
}

export default Dialog
