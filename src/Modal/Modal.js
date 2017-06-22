import React from 'react'
const PropTypes = React.PropTypes
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import RenderLayer from '../internal/RenderLayer'
import Mask from '../internal/Mask'
import classname from 'classnames'

const noop = () => { }

class Modal extends React.Component {
  static propTypes = {
    show: PropTypes.bool,                   //  是否展示 Modal
    isLockScreen: PropTypes.bool,           //  是否锁屏
    onClickAway: PropTypes.func,            //  点击遮罩层的回掉
    prepareStyle: PropTypes.object,         // 需要覆盖的样式
    transitionName: PropTypes.string,       // 动画的类名
    transitionTimeOut: PropTypes.number     // 动画的时间
  }

  static defaultProps = {
    show: false,
    isLockScreen: true,
    onClickAway: noop,
    prepareStyle: {},
    transitionName: 'verticalSlideTB',
    transitionTimeOut: 300
  }

  constructor(props) {
    super(props)
    this.renderContent = this.renderContent.bind(this)
  }

  renderContent() {
    const { children, show, isLockScreen, onClickAway, prepareStyle, transitionName, transitionTimeOut } = this.props
    const style = {
      position: 'fixed',
      top: 0,
      left: show ? 0 : '-10000px',
      width: '100%',
      height: '100%',
      zIndex: 900,
      transition: show
        ? '0ms left 0ms'
        : `0ms left ${transitionTimeOut}ms`
    }

    return (
      <div className='NEUI-Modal' style={Object.assign(style, prepareStyle)}>
        <ReactCSSTransitionGroup
          component='div'
          transitionAppear
          transitionAppearTimeout={transitionTimeOut}
          transitionEnter
          transitionEnterTimeout={transitionTimeOut}
          transitionLeave
          transitionLeaveTimeout={transitionTimeOut}
          transitionName={transitionName}
        >
          {show &&
            children
          }
        </ReactCSSTransitionGroup>
        {isLockScreen && <Mask show={show} onClick={onClickAway} />}
      </div>
    )
  }

  render() {
    return (
      <RenderLayer render={this.renderContent} show />
    )
  }
}

export default Modal
