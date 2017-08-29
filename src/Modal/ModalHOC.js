import React from 'react'
import PropTypes from 'prop-types'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import RenderLayer from '../internal/RenderLayer'
import Mask from '../internal/Mask'
import Modal from './Modal.js'
import classname from 'classnames'

const noop = () => { }

export default function ModalHOC(options) {
  return function (WrapComponent) {
    return class HOC extends React.Component {
      static propTypes = {
        show: PropTypes.bool,       // modal 显示
        onClose: PropTypes.func,  // modal close 事件
        isLockScreen: PropTypes.bool, // 是否添加遮罩
        onMaskClick: PropTypes.func,  // 遮罩点击事件
        isClickMaskToClose: PropTypes.bool, // 是否点击遮罩关闭
        transitionName: PropTypes.string, // 动画的类名
        transitionTimeOut: PropTypes.number, // 动画的时间
        prepareStyle: PropTypes.object // 覆盖默认的 Modal 样式
      }
      static defaultProps = {
        show: false,
        onClose: noop,
        isLockScreen: true,
        onMaskClick: noop,
        isClickMaskToClose: false,
        transitionName: 'verticalSlideTB',
        transitionTimeOut: 300,
        prepareStyle: {},
        ...options
      }
      handleMaskClick =(e) => {
        const {onClose, isClickMaskToClose, onMaskClick} = this.props
        isClickMaskToClose && onClose(e)
        onMaskClick(e)
      }
      renderContent = () => {
        const { show, isLockScreen, onMaskClick, isClickMaskToClose, transitionName, transitionTimeOut, prepareStyle, ...others } = this.props
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
                <WrapComponent {...others} show={show} />
              }
            </ReactCSSTransitionGroup>
            {isLockScreen && <Mask show={show} onClick={this.handleMaskClick} />}
          </div>
        )
      }
      render() {
        return (
          <RenderLayer render={this.renderContent} show />
        )
      }
    }
  }
}
