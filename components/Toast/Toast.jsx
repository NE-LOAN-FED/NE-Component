import React from 'react'
import RenderLayer from '../internal/RenderLayer'
import Icon from '../Icon'

const PropTypes = React.PropTypes

const noop = () => {}

class Toast extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,  // 添加toast class
    show: PropTypes.bool,       // Toast是否显示
    content: PropTypes.string,
    icon: PropTypes.string,
    onClose: PropTypes.func,    // 点击onClose 触发函数
    timeout: PropTypes.number   // 设置 Toast 指定时间隐藏， -1 不自动隐藏
  }
  static defaultProps = {
    prefixCls: 'NEUI',
    show: false,
    timeout: 2000,
    icon: '',
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
    const {prefixCls, content, icon, className} = this.props
    const contentEle = (
      <div className={`${prefixCls}_toast ${className || ''}`}>
        {icon !== '' ? <div className={`${prefixCls}_toast_icon`}><Icon type={icon} /></div> : null}
        <span>{content}</span>
      </div>
    )
    return contentEle
  }

  render() {
    const { prefixCls } = this.props
    return this.state.show ? (
      <div>
        <RenderLayer className={`${prefixCls}_toast_modal`}
          render={this.renderContent}
          show={true}
          maskClosable={false} />
      </div>
    ) : null
  }
}

export default Toast
