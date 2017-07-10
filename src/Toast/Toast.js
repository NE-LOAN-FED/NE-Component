import React from 'react'
import RenderLayer from '../internal/RenderLayer'
import Icon from '../Icon'
import Modal from '../Modal'

const PropTypes = React.PropTypes

const noop = () => { }

class Toast extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,        // 添加toast class
    show: PropTypes.bool,               // Toast是否显示
    prepareStyle: PropTypes.any,         // 需要覆盖 Modal 的样式
    content: PropTypes.string,
    icon: PropTypes.string,
    onClose: PropTypes.func,            // 点击onClose 触发函数
    timeout: PropTypes.number,          // 设置 Toast 指定时间隐藏， -1 不自动隐藏
    isLockScreen: PropTypes.bool,       //  是否锁屏
    transitionName: PropTypes.string,   // 动画的类名
    transitionTimeOut: PropTypes.number // 动画的时间
  }
  static defaultProps = {
    prefixCls: 'NEUI',
    show: false,
    timeout: 2000,
    icon: '',
    prepareStyle: {
      zIndex: 1000
    },
    onClose: noop,
    isLockScreen: false,
    transitionName: 'fade',
    transitionTimeOut: 300
  }

  constructor(props) {
    super(props)
    this.close = this.close.bind(this)
    this.state = {
      show: props.show
    }
    this.autoClose(props.timeout)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show !== this.state.show) {
      if (nextProps.show) {
        this.show()
      } else {
        this.close()
      }
    }
    this.autoClose(nextProps.timeout)
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
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

  render() {
    const { prefixCls, content, icon, show, transitionName,transitionTimeOut, className, isLockScreen, prepareStyle } = this.props
    return (
      <Modal show={show} transitionName={transitionName} transitionTimeOut={transitionTimeOut} isLockScreen={isLockScreen} prepareStyle={prepareStyle}>
        <div className={`${prefixCls}_toast ${className || ''}`}>
          {icon !== '' ? <div className={`${prefixCls}_toast_icon`}><Icon type={icon} /></div> : null}
          <span>{content}</span>
        </div>
      </Modal>
    )
  }
}

export default Toast
