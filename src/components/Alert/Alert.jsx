import React, { Component, PropTypes } from 'react'
import RenderLayer from '../internal/RenderLayer'
import './Alert.scss'


const noop = () => {}

class Alert extends Component {
  static propTypes = {
    className: PropTypes.string,  // 添加alert class
    show: PropTypes.bool,       // alert 显示
    onConfirm: PropTypes.func,  // alert confirm 事件
    onCancel: PropTypes.func,   // alert cancel 事件
    headerContent: PropTypes.node, // 头部内容
    confirmContent: PropTypes.node, // 确认内容
    cancelContent: PropTypes.node  // 取消内容
  }

  static defaultProps = {
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

  renderHeader = () => {
    const { headerContent } = this.props
    let headerEle = null
    if (React.isValidElement(headerContent)) {
      headerEle = React.cloneElement(headerContent, {})
    } else if (typeof headerContent === 'string') {
      headerEle = (
        <div className="ui_alert_header">
          <h4 className="ui_alert_header_content">
            {headerContent}
          </h4>
        </div>
      )
    }
    return headerEle
  }

  renderContent() {
    const { children } = this.props
    let contentEle = null
    if (React.isValidElement(children)) {
      contentEle = React.cloneElement(children, {
        className: 'ui_alert_content'
      })
    } else if (typeof children === 'string') {
      contentEle = (
        <div className="ui_alert_content">
          {children}
        </div>
      )
    }
    return contentEle
  }

  renderAlert() {
    console.log(this)
    const { confirmContent, cancelContent, className } = this.props
    const ConfirmBoxProps = {
      confirmContent,
      cancelContent,
      onConfirm: this.onConfirm,
      onCancel: this.onCancel
    }
    return (
      <div className= {`ui_alert ${className || ''}`} >
        { this.renderHeader() }
        {this.renderContent() }
        <ConfirmBox {...ConfirmBoxProps}></ConfirmBox>
      </div >
    )
  }
  render() {
    const { show } = this.props
    return show ? (
      <div>
        <RenderLayer className="ui_alert_model" render={ this.renderAlert } show={true} useComponentClick={false}/>
      </div>
    ) : null
  }
}

function ConfirmBox({
  onConfirm,
  onCancel,
  confirmContent,
  cancelContent
}) {
  const confirmEle = confirmContent ? <button onClick={onConfirm} className="ui_confirm_button">{confirmContent}</button> : null
  const cancelEle = cancelContent ? <button onClick={onCancel} className="ui_cancel_button">{cancelContent}</button> : null
  return (
    <div className="ui_confirm_box">
      {confirmEle}
      {cancelEle}
    </div>
  )
}

export default Alert
