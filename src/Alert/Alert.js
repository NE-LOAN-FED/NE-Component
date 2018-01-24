import PropTypes from 'prop-types'
import React from 'react'
import classname from 'classnames'
import { ModalHOC } from '../Modal'

const noop = () => { }

class Alert extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    onClose: PropTypes.func // modal close 事件
  }
  static defaultProps = {
    prefixCls: 'NEUI',
    onClose: noop
  }

  render () {
    const {prefixCls, className, children, onClose, show, ...others} = this.props
    const cls = classname({
      [`${prefixCls}_modal`]: true,
      [className]: className
    })
    return (
      <div className={cls} {...others}>
        <div className={`${prefixCls}_modal_body`}>
          {children || null}
        </div>
        <div className={`${prefixCls}_modal_close`} onClick={onClose}>
          <i className={`${prefixCls}_modal_icon ${prefixCls}_modal_icon_close`} />
        </div>
      </div>
    )
  }
}

export default ModalHOC({
  transitionName: 'verticalSlideTB'
})(Alert)
