import PropTypes from 'prop-types'
import React from 'react'
import Icon from '../Icon'
import ModalHOC from '../Modal'
import classnames from 'classnames'
import BaseProps from './PropsType'

const noop = () => { }

export interface ToastProps extends BaseProps {
  prefixCls: string;
  className?: string;
}

class Toast extends React.Component<ToastProps, any> {
  timer: number
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string, // 添加toast class
    content: PropTypes.string,
    icon: PropTypes.string,
    onClose: PropTypes.func, // 点击onClose 触发函数
    timeout: PropTypes.number // 设置 Toast 指定时间隐藏， -1 不自动隐藏
  }
  static defaultProps = {
    prefixCls: 'NEUI',
    timeout: 2000,
    icon: '',
    onClose: noop,
  }

  constructor (props) {
    super(props)
    this.close = this.close.bind(this)
    this.state = {
      show: props.show
    }
    this.autoClose(props.timeout)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.show !== this.state.show) {
      if (nextProps.show) {
        this.show()
      } else {
        this.close()
      }
    }
    this.autoClose(nextProps.timeout)
  }

  componentWillUnmount () {
    clearTimeout(this.timer)
  }

  autoClose (timeout = 0) {
    if (timeout >= 0) {
      this.timer = setTimeout(() => {
        this.close()
      }, timeout)
    }
  }

  show () {
    this.setState({
      show: true
    })
  }

  close () {
    const {onClose} = this.props
    if (this.state.show) {
      this.setState({
        show: false
      }, () => {
        onClose()
      })
    }
  }

  render () {
    const {prefixCls, content, icon, className} = this.props
    const cls = classnames({
      [`${prefixCls}_toast`]: true,
      [className as string]: !!className
    })
    return (
      <div className={cls}>
        {!!icon ? <div className={`${prefixCls}_toast_icon`}><Icon type={icon} /></div> : null}
        <span>{content}</span>
      </div>
    )
  }
}

export default ModalHOC({
  prepareStyle: {
    zIndex: 1000
  },
  transitionName: 'fade'
})(Toast)
