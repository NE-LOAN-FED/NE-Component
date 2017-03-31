import React from 'react'
const PropTypes = React.PropTypes
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import RenderLayer from '../internal/RenderLayer'
import Mask from '../internal/Mask'
import classname from 'classnames'

const noop = () => { }

class DiglogContent extends React.Component {
  render() {
    const { prefixCls, confirmContent, headerContent, onConfirm, onCancel, cancelContent, className, show, transitionName, transitionTimeOut } = this.props

    const style = {
      root: {
        position: 'fixed',
        top: 0,
        left: show ? 0 : '-10000px',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 900,
        transition: show
          ? '0ms left 0ms'
          : `0ms left ${transitionTimeOut}ms`
      }
    }
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
    return (
      <div style={style.root}>
        <ReactCSSTransitionGroup
          component='div'
          transitionAppear
          transitionAppearTimeout={transitionTimeOut}
          transitionEnter
          transitionEnterTimeout={transitionTimeOut}
          transitionLeave
          transitionLeaveTimeout={transitionTimeOut}
          transitionName={transitionName}
        >
          {show &&
            <div className={`${prefixCls}_dialog ${className || ''}`} >
              {header}
              {content}
              <div className={`${prefixCls}_dialog_confirm_box`}>
                {cancelEle}
                {confirmEle}
              </div>
            </div >
          }
        </ReactCSSTransitionGroup>
        <Mask show={show} />
      </div>
    )
  }
}

class Dialog extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,  // 添加dialog class
    show: PropTypes.bool,       // dialog 显示
    onConfirm: PropTypes.func,  // dialog confirm 事件
    onCancel: PropTypes.func,   // dialog cancel 事件
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
    transitionName: 'vertialSlide',
    transitionTimeOut: 300
  }

  constructor(props) {
    super(props)
    this.renderContent = this.renderContent.bind(this)
  }

  renderContent() {
    return (
      <DiglogContent {...this.props} />
    )
  }

  render() {
    return (
      <RenderLayer render={this.renderContent} show />
    )
  }
}

export default Dialog
