import React from 'react'
import RenderLayer from '../internal/RenderLayer'
import ReactCssTransitionGroup from 'react-addons-css-transition-group'

const PropTypes = React.PropTypes

const noop = () => { }

class Modal extends React.Component {
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
    const { prefixCls, className, onClose, children, show } = this.props
    // TODO close icon 修改
    return (
      <ReactCssTransitionGroup
        transitionAppear
        transitionAppearTimeout={10000}
        transitionEnter
        transitionEnterTimeout={10000}
        transitionLeaveTimeout={10000}
        transitionName={'floatLayer'}
      >
        {show &&
          <div className={`${prefixCls}_modal ${className || ''}`}>
            <div className={`${prefixCls}_modal_body`}>
              {children || null}
            </div>
            <div className={`${prefixCls}_modal_close`} onClick={this.onClose}>
              <i className={`${prefixCls}_modal_icon ${prefixCls}_modal_icon_close`} />
            </div>
          </div>
        }
      </ReactCssTransitionGroup>
    )
  }
  render() {
    const { prefixCls, show } = this.props
    return show ? (
      <div>
        <RenderLayer className={`${prefixCls}_modal_modal`} render={this.renderModal} show maskClosable={false} />
      </div>
    ) : null
  }
}

export default Modal
