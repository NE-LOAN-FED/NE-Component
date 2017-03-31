import React from 'react'
const PropTypes = React.PropTypes
import ReactCSSTransitionGroup from 'react-addons-transition-group'
import RenderLayer from '../internal/RenderLayer'

const noop = () => { }

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
    const { prefixCls, className, children, onClose, show, transitionName, transitionTimeOut } = this.props
    console.log('show', show)
    const Content = (
      <div className={`${prefixCls}_modal ${className || ''}`}>
        <div className={`${prefixCls}_modal_body`}>
          {children || null}
        </div>
        <div className={`${prefixCls}_modal_close`} onClick={onClose}>
          <i className={`${prefixCls}_modal_icon ${prefixCls}_modal_icon_close`} />
        </div>
      </div>
    )
    return (
      <div>
        <ReactCSSTransitionGroup
          transitionAppear
          transitionAppearTimeout={300}
          transitionLeave
          transitionLeaveTimeout={300}
          transitionName={transitionName}
        >
          {show && Content}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
  render() {
    const { prefixCls, className, children, onClose, show, transitionName, transitionTimeOut } = this.props
    return (
      <RenderLayer render={this.renderContent} show />
    )
  }
}
