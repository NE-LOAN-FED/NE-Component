import React from 'react'
const PropTypes = React.PropTypes
import classname from 'classnames'
import Modal from '../Modal'
const noop = () => { }

export default class Alert extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    show: PropTypes.bool,       // modal 显示
    onClose: PropTypes.func,  // modal close 事件
    transitionName: PropTypes.string, // 动画的类名
    transitionTimeOut: PropTypes.number // 动画的时间
  }

  static defaultProps = {
    prefixCls: 'NEUI',
    show: false,
    onClose: noop,
    transitionName: 'verticalSlideTB',
    transitionTimeOut: 300
  }

  render() {
    const { prefixCls, className, children, onClose, show, transitionName, transitionTimeOut, ...others } = this.props
    const cls = classname({
      [`${prefixCls}_modal`]: true,
      [className]: className
    })
    return (
      <Modal show={show} transitionName={transitionName} transitionTimeOut={transitionTimeOut}>
        <div className={cls} {...others}>
          <div className={`${prefixCls}_modal_body`}>
            {children || null}
          </div>
          <div className={`${prefixCls}_modal_close`} onClick={onClose}>
            <i className={`${prefixCls}_modal_icon ${prefixCls}_modal_icon_close`} />
          </div>
        </div>
      </Modal>
    )
  }
}
