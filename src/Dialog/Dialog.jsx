import React from 'react'
import Modal from '../Modal'

const PropTypes = React.PropTypes

const noop = () => { }

class Dialog extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,  // 添加alert class
    show: PropTypes.bool,       // alert 显示
    onConfirm: PropTypes.func,  // alert confirm 事件
    onCancel: PropTypes.func,   // alert cancel 事件
    headerContent: PropTypes.node, // 头部内容
    confirmContent: PropTypes.node, // 确认内容
    cancelContent: PropTypes.node,  // 取消内容
    transitionName: PropTypes.string, // 动画的类名
    transitionTimeOut: PropTypes.number // 动画的时间
  }

  static defaultProps = {
    prefixCls: 'NEUI',
    show: false,
    onConfirm: noop,
    onCancel: noop,
    transitionName: 'floatLayer'
  }

  constructor(props) {
    super(props)
    this.onConfirm = this.onConfirm.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  onConfirm() {
    const { onConfirm } = this.props
    onConfirm && onConfirm()
  }

  onCancel() {
    const { onCancel } = this.props
    onCancel && onCancel()
  }
  render() {
    const { prefixCls, confirmContent, headerContent, cancelContent, className, show, transitionName, transitionTimeOut} = this.props
    console.log(show)
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
      <Modal onClose={this.onCancel} show={show} transitionName={transitionName} transitionTimeOut={transitionTimeOut}>
        <DialogContent prefixCls={prefixCls} className={className} header={header} content={content} ConfirmBoxProps={ConfirmBoxProps} />
      </Modal>
    )
  }
}
function DialogContent({
  prefixCls,
  className,
  header,
  content,
  ConfirmBoxProps
}) {
  const { onConfirm, onCancel, confirmContent, cancelContent } = ConfirmBoxProps
  const confirmEle = confirmContent ? <button onClick={onConfirm} className={`${prefixCls}_alert_confirm_button`}>{confirmContent}</button> : null
  const cancelEle = cancelContent ? <button onClick={onCancel} className={`${prefixCls}_alert_cancel_button`}>{cancelContent}</button> : null
  return (
    < div className={`${prefixCls}_alert ${className || ''}`
    } >
      {header}
      {content}
      <div className={`${prefixCls}_alert_confirm_box`}>
        {cancelEle}
        {confirmEle}
      </div>
    </div >
  )
}
export default Dialog
