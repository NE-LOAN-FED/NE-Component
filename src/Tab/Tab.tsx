/**
 * Created by hzyanming on 17/6/28.
 */
import React, { Component } from 'react'
import classnames from 'classnames'
import {TabItemPropsType, TabPropsType as BaseTabProps} from './PropsType'
const noop = () => {}
export
class TabItem extends Component<TabItemPropsType,any> {
  static defaultProps = {
    disabled: false,
    isShow: false
  }

  render () {
    const {children, isShow} = this.props
    return (
      <div className='NEUI_tab_content_item' style={{'display': (isShow ? 'block' : 'none')}}>{children}</div>
    )
  }
}

export interface TabPropsType extends BaseTabProps {
  prefixCls: string;
  className?: string
}
export default class Tab extends Component<TabPropsType,any> {
  static Item = TabItem
  static defaultProps = {
    prefixCls: 'NEUI',
    onChange: noop,
    animated: true
  }
  /**
   * 获取默认 activeIndex
   * @return {string}
   */
  getActiveIndex = (props) => {
    let activeIndex
    if ('activeIndex' in props) {
      activeIndex = props.activeIndex
    } else if ('defaultActiveIndex' in props) {
      activeIndex = props.defaultActiveIndex
    } else {
      activeIndex = (function (props) {
        let index
        props.children.forEach(child => {
          if (!index && !child.props.disabled) {
            index = child.key
          }
        })
        return index
      }(props))
    }
    return activeIndex + ''
  }
  getHeaderClass = (index, disabled) => {
    let {activeIndex} = this.state
    const {prefixCls} = this.props
    if ('activeIndex' in this.props) {
      activeIndex = this.props.activeIndex
    }
    if (disabled) {
      return `${prefixCls}_tab_header_item disabled`
    }
    return activeIndex === index ? `${prefixCls}_tab_header_item active` : `${prefixCls}_tab_header_item`
  }
  handleTabClick = (index, disabled) => {
    const {onChange} = this.props
    if (!disabled) {
      this.setState({
        activeIndex: index
      })
      onChange && onChange(index)
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      activeIndex: this.getActiveIndex(props)
    }
  }

  componentWillReceiveProps (nextProps) {
    if ('activeIndex' in nextProps) {
      this.setState({
        activeIndex: nextProps.activeIndex
      })
    }
  }

  render () {
    const {children, className, prefixCls, animated} = this.props
    let {activeIndex} = this.state
    if ('activeIndex' in this.props) {
      activeIndex = this.props.activeIndex + ''
    }
    const cls = classnames({
      [`${prefixCls}_tab`]: true,
      [className as string]: !!className
    })

    const barIndex = (function (children, activeIndex) {
      let index
      React.Children.forEach(children, (child, i)=>{
        if ((child as React.ReactElement<any>).key === activeIndex) {
          index = i
        }
      })
      return index
    }(children, activeIndex))
    const percent:number = parseFloat((100 / (children as Array<any>).length).toFixed(1))
    const percentLeft = barIndex * percent
    const percentRight = 100 - (barIndex + 1) * percent

    return (
      <div className={cls}>
        <div className={`${prefixCls}_tab_header`}>
          {
            React.Children.map(children, el => {
              if (el === null) return null
              if(typeof el === 'string' || typeof el === 'number') return el
              return (
                <div
                  key={((el as React.ReactElement<any>).key) as string}
                  className={this.getHeaderClass(el.key, el.props.disabled)}
                  onClick={() => this.handleTabClick(el.key, el.props.disabled)}
                >
                  {el.props.title}
                </div>
              )
            })
          }
          <div className={classnames({[`${prefixCls}_ink_bar`]: true, bar_animate: animated})}
            style={{'left': percentLeft + '%', 'right': percentRight + '%'}} />
        </div>
        <div className={`${prefixCls}_tab_content`}>
          {
            React.Children.map(children, el=> {
              if (typeof el === 'string' || typeof el === 'number') return el
              return React.cloneElement(el as React.ReactElement<any>, {
                key: el.key,
                isShow: el.key === activeIndex
              })
            })
          }
        </div>
      </div>
    )
  }
}

