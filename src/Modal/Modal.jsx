import React from 'react'
import RenderLayer from '../internal/RenderLayer'
import ReactTransitionGroup from 'react-addons-transition-group'
import classname from 'classnames'

const PropTypes = React.PropTypes

const noop = () => { }

class TransitionItem extends React.Component {
  static PropTypes = {
    timeOut: React.PropTypes.number,
    transitionName: React.PropTypes.string
  }

  static defaultProps = {
    timeOut: 300
  }

  constructor(props) {
    super(props)
    this.state = {
      cls: classname()
    }
    this.transitionName = this.props.transitionName
  }
  componentWillAppear(callback) {
    this.setState({
      cls: classname({
        [`${this.transitionName}-appear`]: true
      })
    }, () => {
      setTimeout(() => {
        this.setState({
          cls: classname({
            [`${this.transitionName}-appear`]: true,
            [`${this.transitionName}-appear-active`]: true
          })
        })
      })
    })
    this.appearTimeOut = setTimeout(callback, this.props.timeOut)
  }

  componentDidAppear() {
    this.setState({
      cls: classname({
        [`${this.transitionName}-appear`]: false,
        [`${this.transitionName}-appear-active`]: false
      })
    })
  }
  componentWillLeave(callback) {
    this.setState({
      cls: classname({
        [`${this.transitionName}-leave`]: true
      })
    }, () => {
      this.setState({
        cls: classname({
          [`${this.transitionName}-leave`]: true,
          [`${this.transitionName}-leave-active`]: true
        })
      })
    })
    this.leaveTimeOut = setTimeout(callback, this.props.timeOut)
  }
  componentDidLeave() {
    this.setState({
      cls: classname({
        [`${this.transitionName}-leave`]: false,
        [`${this.transitionName}-leave-active`]: false
      })
    })
  }
  componentWillUnmount() {
    clearTimeout(this.appearTimeOut)
    clearTimeout(this.leaveTimeOut)
    this.props.onClose()
  }
  render() {
    return (
      <div className={this.state.cls}>
        {this.props.children}
      </div>
    )
  }
}

class Modal extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,  // 添加modal class
    show: PropTypes.bool,       // modal 显示
    onClose: PropTypes.func  // modal close 事件
  }

  static defaultProps = {
    prefixCls: 'NEUI',
    show: false,
    onClose: noop
  }

  constructor(props) {
    super(props)
    this.handleModalClose = this.handleModalClose.bind(this)
    this.renderModal = this.renderModal.bind(this)
    this.state = {
      showModal: typeof this.props.show === 'undefined' ? false : this.props.show
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.show && !this.state.showModal) {
      this.setState({
        showModal: true
      })
    }
  }
  handleModalClose() {
    this.setState({
      showModal: false
    })
  }

  renderModal() {
    const { prefixCls, className, onClose, children, show, transitionName, timeOut } = this.props
    const { showModal } = this.state
    const handleModalClose = this.handleModalClose
    // TODO close icon 修改
    return (
      <ReactTransitionGroup
        transitionAppear
        transitionAppearTimeout={timeOut}
        transitionLeave
        transitionLeaveTimeout={timeOut}
      >
        {showModal &&
          <TransitionItem onClose={onClose} transitionName={transitionName}>
            {React.cloneElement(children, {
              handleModalClose
            })}
          </TransitionItem>
        }
      </ReactTransitionGroup>
    )
  }
  render() {
    const { prefixCls, show } = this.props
    return (
      <RenderLayer className={`${prefixCls}_modal_modal`} render={this.renderModal} show={show} maskClosable={false} />
    )
  }
}

export default Modal
