import React from 'react'
const PropTypes = React.PropTypes
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import RenderLayer from '../internal/RenderLayer'
import Mask from '../internal/Mask.jsx'
import classname from 'classnames'

const noop = () => { }

class AlertContent extends React.Component {
  render() {
    const { prefixCls, className, children, onClose, show, transitionName, transitionTimeOut } = this.props
    console.log('show', show)
    const cls = classname({
      [`${prefixCls}_modal`]: true,
      [className]: className
    })
    const Content = (
      <div className={cls}>
        <div className={`${prefixCls}_modal_body`}>
          {children || null}
        </div>
        <div className={`${prefixCls}_modal_close`} onClick={onClose}>
          <i className={`${prefixCls}_modal_icon ${prefixCls}_modal_icon_close`} />
        </div>
      </div>
    )
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
        zIndex: 900
      }
    }
    return (
      <div style={style.root}>
        <ReactCSSTransitionGroup
          component='div'
          transitionAppear
          transitionAppearTimeout={1000}
          transitionEnter={false}
          transitionLeave
          transitionLeaveTimeout={1000}
          transitionName={transitionName}
        >
          {show && Content}
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
    transitionName: 'vertialSlide'
  }
  renderContent() {
    return (
      <AlertContent {...this.props} />
    )
  }
  render() {
    const { prefixCls, className, children, onClose, show, transitionName, transitionTimeOut } = this.props
    return (
      <RenderLayer render={this.renderContent} show />
    )
  }
}
