/**
 * Created by kisnows on 2017/5/26.
 */
import * as React from 'react'
import classnames from 'classnames'
import ModalHOC from '../Modal'
import BasePropsTypes from './PropTypes'

const noop = () => { }

export interface ActionSheetProps extends BasePropsTypes {
  prefixCls: string;
  className?: string;
}

class ActionSheet extends React.Component<ActionSheetProps, {}> {

  static defaultProps = {
    prefixCls: 'NEUI',
    onClose: noop,
    onMenuClick: noop,
    autoClose: true,
    showCancel: false,
    cancelText: '取消',
    menus: []
  }

  handleMenuClick = (key) => {
    const {autoClose, onMenuClick, onClose} = this.props
    autoClose && onClose()
    onMenuClick(key)
  }

  render () {
    const {
      prefixCls, show, menus, className, showCancel, cancelText, title, ...others
    } = this.props
    const cls = classnames({
      [`${prefixCls}_action__sheet`]: true,
      [className as string]: !!className
    })
    return (
      <ul className={cls} {...others}>
        {title ? <li>{title}</li> : null}
        {menus.map((el, index) => {
          return <li key={index} onClick={() => this.handleMenuClick(index)}>{el}</li>
        })}
        {showCancel &&
        <li className={`${prefixCls}_action_cancel`} key={-1} onClick={() => this.handleMenuClick(-1)}>{cancelText}</li>
        }
      </ul>
    )
  }
}

export default ModalHOC({
  transitionName: 'verticalSlideBT'
})(ActionSheet)
