import React, { Component, PropTypes } from 'react'
import RenderLayer from '../internal/RenderLayer'
import './Alert.scss'


const noop = () => { }

class Alert extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,  // 添加alert class
    show: PropTypes.bool,       // alert 显示
    onConfirm: PropTypes.func,  // alert confirm 事件
    onCancel: PropTypes.func,   // alert cancel 事件
    headerContent: PropTypes.node, // 头部内容
    confirmContent: PropTypes.node, // 确认内容
    cancelContent: PropTypes.node  // 取消内容
  }

  static defaultProps = {
    prefixCls: 'NEUI',
    show: false,
    onConfirm: noop,
    onCancel: noop
  }

  constructor(props) {
    super(props)
    this.onConfirm = this.onConfirm.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.renderAlert = this.renderAlert.bind(this)
  }

  onConfirm() {
    const { onConfirm } = this.props
    onConfirm && onConfirm()
  }

  onCancel() {
    const { onCancel } = this.props
    onCancel && onCancel()
  }

  renderAlert() {
    const { prefixCls, confirmContent, headerContent, cancelContent, className } = this.props
    const ConfirmBoxProps = {
      prefixCls,
      confirmContent,
      cancelContent,
      onConfirm: this.onConfirm,
      onCancel: this.onCancel
    }
    const header = headerContent ? (<div className={`${prefixCls}_alert_header`}>
      <h4 className={`${prefixCls}_alert_header_content`}>
        {headerContent}
      </h4>
    </div>) : null
    const content = this.props.children ? (
      <div className={`${prefixCls}_alert_content`}>
        {this.props.children}
      </div>
    ) : null
    return (
      <div className={`${prefixCls}_alert ${className || ''}`} >
        {header}
        {content}
        <ConfirmBox {...ConfirmBoxProps}></ConfirmBox>
      </div >
    )
  }
  render() {
    const { prefixCls, show } = this.props
    return show ? (
      <div>
        <RenderLayer className={`${prefixCls}_alert_modal`} render={this.renderAlert} show={true} useComponentClick={false} />
      </div>
    ) : null
  }
}

function ConfirmBox({
  prefixCls,
  onConfirm,
  onCancel,
  confirmContent,
  cancelContent
}) {
  const confirmEle = confirmContent ? <button onClick={onConfirm} className={`${prefixCls}_alert_confirm_button`}>{confirmContent}</button> : null
  const cancelEle = cancelContent ? <button onClick={onCancel} className={`${prefixCls}_alert_cancel_button`}>{cancelContent}</button> : null
  return (
    <div className={`${prefixCls}_alert_confirm_box`}>
      {cancelEle}
      {confirmEle}
    </div>
  )
}

export default Alert
