import PropTypes from 'prop-types'
import React from 'react'
import classname from 'classnames'
import { ModalHOC } from '../Modal'

const noop = () => { }

class Dialog extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    onConfirm: PropTypes.func, // dialog confirm 事件
    onCancel: PropTypes.func, // dialog cancel 事件
    headerContent: PropTypes.node, // 头部内容
    confirmContent: PropTypes.node, // 确认内容
    cancelContent: PropTypes.node // 取消内容
  }

  static defaultProps = {
    prefixCls: 'NEUI',
    onConfirm: noop,
    onCancel: noop
  }

  render () {
    const {prefixCls, confirmContent, headerContent, onConfirm, onCancel, cancelContent, className, onClose, show, ...others} = this.props
    const confirmEle = confirmContent
      ? <button onClick={onConfirm} className={`${prefixCls}_dialog_confirm_button`}>{confirmContent}</button> : null
    const cancelEle = cancelContent
      ? <button onClick={onCancel} className={`${prefixCls}_dialog_cancel_button`}>{cancelContent}</button> : null
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
      <div className={cls} {...others}>
        {header}
        {content}
        <div className={`${prefixCls}_dialog_confirm_box`}>
          {cancelEle}
          {confirmEle}
        </div>
      </div>
    )
  }
}

export default ModalHOC()(Dialog)
