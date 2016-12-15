import React, { Component, PropTypes } from 'react'
import RenderLayer from '../internal/RenderLayer'
import './Toast.scss'


const noop = () => {}

class Toast extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,  // 添加toast class
    show: PropTypes.bool,       // Toast是否显示
    onClose: PropTypes.func,    // 点击onClose 触发函数
    timeout: PropTypes.number   // 设置 Toast 指定时间隐藏， -1 不自动隐藏
  }
  static defaultProps = {
    prefixCls: 'NEUI',
    show: false,
    timeout: 2000,
    onClose: noop
  }
  constructor(props) {
    super(props)
    this.renderContent = this.renderContent.bind(this)

    this.state = {
      show: props.show
    }
    this.autoClose(props.timeout)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show !== this.state.show) {
      if (nextProps.show) {
        this.show()
        this.autoClose(nextProps.timeout)
      } else {
        this.close()
      }
    }
  }

  autoClose(timeout = 0) {
    if (timeout >= 0) {
      this.timer = setTimeout(() => {
        this.close()
      }, timeout)
    }
  }

  show() {
    this.setState({
      show: true
    })
  }

  close() {
    const { onClose } = this.props
    if (this.state.show) {
      this.setState({
        show: false
      }, () => {
        onClose()
      })
    }
  }

  renderContent() {
    const { prefixCls, children, className } = this.props
    let contentEle = null
    if (React.isValidElement(children)) {
      contentEle = React.cloneElement(children, {
        className: `${prefixCls}_toast ${className || ''}`
      })
    } else if (typeof children === 'string') {
      contentEle = (
        <div className={`${prefixCls}_toast ${className || ''}`}>
          {children}
        </div>
      )
    }
    return contentEle
  }

  render() {
    const { prefixCls } = this.props
    return this.state.show ? (
      <div>
        <RenderLayer className={`${prefixCls}_toast_modal`} render={this.renderContent} show={true} useComponentClick={false} />
      </div>
    ) : null
  }
}

export default Toast
