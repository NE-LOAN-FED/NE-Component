/**
 * Created by hzyanming on 17/6/28.
 */
import React, { Component, PropTypes } from 'react'
import classname from 'classnames'
const noop = () => {}

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
    defaultActiveIndex: PropTypes.oneOfType([ // 默认选项卡index
      PropTypes.number,
      PropTypes.string,
    ]),
    activeIndex: PropTypes.oneOfType([ // 当前选项卡index
      PropTypes.number,
      PropTypes.string,
    ]),
    onChange: PropTypes.func, // 切换选项卡的回调
    animated: PropTypes.bool // 切换是否有动画
  }

  static defaultProps = {
    prefixCls: 'NEUI',
    onChange: noop,
    animated: true
  }

  constructor(props) {
    super(props)

    let activeIndex
    if ('activeIndex' in props) {
      activeIndex = props.activeIndex;
    } else if ('defaultActiveIndex' in props) {
      activeIndex = props.defaultActiveIndex;
    } else {
      activeIndex = function(props) {
        let index
        props.children.forEach(child => {
          if (!index && !child.props.disabled) {
            index = child.key
          }
        });
        return index
      }(props)
    }

    this.state = {
      activeIndex
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('activeIndex' in nextProps) {
      this.setState({
        activeIndex: nextProps.activeIndex,
      });
    }
  }

  checkHeaderClass = (index, disabled) => {
    let { activeIndex } = this.state
    const { prefixCls } = this.props
    if ('activeIndex' in this.props) {
      activeIndex = this.props.activeIndex
    }
    if (disabled) {
      return `${prefixCls}_tab_header_item disabled`
    }
    return activeIndex == index ? `${prefixCls}_tab_header_item active` : `${prefixCls}_tab_header_item`
  }

  handleTabClick = (index, disabled) => {
    const { onChange } = this.props
    if (!disabled) {
      this.setState({
        activeIndex: index
      })
      onChange && onChange(index)
    }
  }

  render() {
    const { children, className, prefixCls, animated } = this.props
    let { activeIndex } = this.state
    if ('activeIndex' in this.props) {
      activeIndex = this.props.activeIndex
    }
    const cls = classname({
      [`${prefixCls}_tab`]: true,
      [className]: className
    })
    const percent = (100 / children.length).toFixed(1)
    const percentLeft = parseInt(activeIndex, 10) * percent
    const percentRight = 100 - (parseInt(activeIndex, 10) + 1) * percent

    return (
      <div className={cls}>
        <div className={`${prefixCls}_tab_header`}>
          {children.map((el) => {
            return (
              <div
                key={el.key}
                className={this.checkHeaderClass(el.key, el.props.disabled)}
                onClick={() => this.handleTabClick(el.key, el.props.disabled)}
              >
                { el.props.title }
              </div>
            )
          })}
          <div className={classname({[`${prefixCls}_ink_bar`]: true, bar_animate: animated})} style={{ 'left': percentLeft + '%', 'right': percentRight + '%' }}></div>
        </div>
        <div className={`${prefixCls}_tab_content`}>
          {children.map((el) => {
            return React.cloneElement(el, {
              key: el.key,
              isShow: el.key == activeIndex
            })
          })}
        </div>
      </div>
    )
  }
}

Tab.Item = TabItem
