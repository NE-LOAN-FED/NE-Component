/**
 * Created by hzyanming on 17/6/28.
 */
import React, { Component, PropTypes } from 'react'
import classname from 'classnames'
const noop = () => { }

class TabItem extends Component {
  static propTypes = {
    title: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    isShow: PropTypes.bool
  }

  static defaultProps = {
    disabled: false,
    isShow: false
  }

  render() {
    const { children, isShow } = this.props
    return (
      <div className="NEUI_tab_content_item" style={{'display': (isShow ? 'block' : 'none')}}>{ children }</div>
    )
  }
}


export default class Tab extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    defaultIndex: PropTypes.number, // 默认选项卡
    onChange: PropTypes.func, // 切换选项卡的回调
    animated: PropTypes.bool // 切换是否有动画
  }

  static defaultProps = {
    prefixCls: 'NEUI',
    defaultIndex: 0,
    onChange: noop,
    animated: true
  }

  constructor(props) {
    super(props)
    this.state = {
      currentIndex: props.defaultIndex || 0
    }
  }

  checkHeaderClass = (index, disabled) => {
    const { currentIndex } = this.state
    const { prefixCls } = this.props
    if (disabled) {
      return `${prefixCls}_tab_header_item disabled`
    }
    return currentIndex === index ? `${prefixCls}_tab_header_item active` : `${prefixCls}_tab_header_item`
  }

  handleTabClick = (index, disabled) => {
    const { onChange } = this.props
    if (!disabled) {
      this.setState({
        currentIndex: index
      })
      onChange && onChange(index)
    }
  }

  render() {
    const { children, className, prefixCls, animated } = this.props
    const { currentIndex } = this.state
    const cls = classname({
      [`${prefixCls}_tab`]: true,
      [className]: className
    })
    const percent = (100 / children.length).toFixed(1)
    return (
      <div className={cls}>
        <div className={`${prefixCls}_tab_header`}>
          {children.map((el, index) => {
            return (
              <div
                key={index}
                className={this.checkHeaderClass(index, el.props.disabled)}
                onClick={() => this.handleTabClick(index, el.props.disabled)}
              >
                { el.props.title }
              </div>
            )
          })}
          <div className={`${prefixCls}_ink_bar ` + (animated ? 'bar_animate' : '')} style={{ 'left': currentIndex * percent + '%', 'right': (100 - (currentIndex + 1) * percent) + '%' }}></div>
        </div>
        <div className={`${prefixCls}_tab_content`}>
          {children.map((el, index) => {
            return React.cloneElement(el, {
              key: index,
              isShow: index === currentIndex
            })
          })}
        </div>
      </div>
    )
  }
}

Tab.Item = TabItem
