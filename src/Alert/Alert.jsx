import React from 'react'
const PropTypes = React.PropTypes
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import RenderLayer from '../internal/RenderLayer'
import Mask from '../internal/Mask'
import classname from 'classnames'

const noop = () => { }

class AlertContent extends React.Component {
  render() {
    const { prefixCls, className, children, onClose, show, transitionName, transitionTimeOut } = this.props
    const cls = classname({
      [`${prefixCls}_modal`]: true,
      [className]: className
    })
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
            <div className={cls}>
              <div className={`${prefixCls}_modal_body`}>
                {children || null}
              </div>
              <div className={`${prefixCls}_modal_close`} onClick={onClose}>
                <i className={`${prefixCls}_modal_icon ${prefixCls}_modal_icon_close`} />
              </div>
            </div>
          }
        </ReactCSSTransitionGroup>
        <Mask show={show} />
      </div>
    )
  }
}

export default class Alert extends React.Component {
  constructor() {
    super()
    this.renderContent = this.renderContent.bind(this)
  }
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
    transitionName: 'vertialSlide',
    transitionTimeOut: 300
  }
  renderContent() {
    return (
      <AlertContent {...this.props} />
    )
  }
  render() {
    return (
      <RenderLayer render={this.renderContent} show />
    )
  }
}
