import React from 'react'
import classNames from 'classnames'
import RenderLayer from '../internal/RenderLayer'

const PropTypes = React.PropTypes

const noop = () => {}

class Popup extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,  // 添加 popup class
    show: PropTypes.bool,       // popup 显示
    type: PropTypes.oneOf(['bottom', 'top']),      // popup 位置，默认底部
    maskClosable: PropTypes.bool,  // 点击遮罩是否可以关闭,默认可以关闭
    onMaskClose: PropTypes.func    // 遮罩关闭回调函数
  }

  static defaultProps = {
    prefixCls: 'NEUI',
    show: false,
    type: 'bottom',
    maskClosable: true,
    onMaskClose: () => { }
  }

  constructor(props) {
    super(props)
    this.onMaskClose = this.onMaskClose.bind(this)
    this.renderContent = this.renderContent.bind(this)
    this.state = {
      show: props.show
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.show !== this.props.show) {
      this.setState({
        show: newProps.show
      })
    }
  }

  onMaskClose() {
    this.setState({
      show: false
    })
    this.props.onMaskClose()
  }

  renderContent() {
    const {prefixCls, className, type, children} = this.props
    const classnames = classNames({
      [`${prefixCls}_popup`]: true,
      [className]: !!className,
      [`${prefixCls}_popup_${type}`]: true
    })
    return (
      <div className={classnames}>
        {children}
      </div >
    )
  }

  render() {
    const {prefixCls, maskClosable, onMaskClose} = this.props

    return (
      <RenderLayer className={`${prefixCls}_popup_modal`} render={this.renderContent} show={this.state.show} maskClosable={maskClosable} onMaskClose={this.onMaskClose} />
    )
  }
}

export default Popup

