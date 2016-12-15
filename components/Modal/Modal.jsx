import React, { Component, PropTypes } from 'react'
import RenderLayer from '../internal/RenderLayer'
import './Modal.scss'


const noop = () => { }

class Modal extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,  // 添加modal class
    show: PropTypes.bool,       // modal 显示
    onClose: PropTypes.func  // modal close 事件
  }

  static defaultProps = {
    prefixCls: 'NEUI',
    show: false,
    onClose: noop
  }

  constructor(props) {
    super(props)
    this.onClose = this.onClose.bind(this)
    this.renderModal = this.renderModal.bind(this)
  }

  onClose() {
    this.props.onClose()
  }

  renderModal() {
    const { prefixCls, className, onClose, children } = this.props
    // TODO close icon 修改
    return (
      <div className={`${prefixCls}_modal ${className || ''}`}>
        <div className={`${prefixCls}_modal_body`}>
          {children || null}
        </div>
        <div className={`${prefixCls}_modal_close`} onClick={this.onClose}>
          <i className={`${prefixCls}_modal_icon ${prefixCls}_modal_icon_close`} />
        </div>
      </div>
    )
  }
  render() {
    const { prefixCls, show } = this.props
    return show ? (
      <div>
        <RenderLayer className={`${prefixCls}_modal_modal`} render={this.renderModal} show={true} useComponentClick={false} />
      </div>
    ) : null
  }
}

export default Modal
