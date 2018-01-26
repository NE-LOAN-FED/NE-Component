import React from 'react'
import PropTypes from 'prop-types'
import RenderLayer from '../internal/RenderLayer'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Mask from '../internal/Mask'
import histNonReactStatic from 'hoist-non-react-statics'
import getDisplayName from '../_utils/getComponentName'
import BasePropTypes from './PropTypes'
const noop = () => { }
export interface ModalPropType extends BasePropTypes {

}
export default function ModalHOC (options) {
  return function (WrapComponent) {
    class HOC extends React.Component<ModalPropType,{}> {
      static displayName = `HOC(${getDisplayName(WrapComponent)})`

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
      handleMaskClick = (e) => {
        const {onClose, isClickMaskToClose, onMaskClick} = this.props
        isClickMaskToClose && onClose(e)
        onMaskClick(e)
      }
      renderContent = () => {
        const {show, isLockScreen, onMaskClick, isClickMaskToClose, transitionName, transitionTimeOut, prepareStyle, ...others} = this.props
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
            <TransitionGroup>
              {show &&
              <CSSTransition classNames={transitionName} in={show} timeout={transitionTimeOut}>
                <WrapComponent {...others} show={show} />
              </CSSTransition>
              }
            </TransitionGroup>
            {isLockScreen && <Mask show={show} onClick={this.handleMaskClick} />}
          </div>
        )
      }

      render () {
        return (
          <RenderLayer render={this.renderContent} show />
        )
      }
    }

    histNonReactStatic(HOC, WrapComponent)
    return HOC
  }
}
