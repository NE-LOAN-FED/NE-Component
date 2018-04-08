import * as React from 'react'
import ModalHOC from '../Modal'
import BasePropTypes from '../Modal/PropTypes'
import classnames from 'classnames'

export interface AlertPropTypes extends BasePropTypes {
  prefixCls?: string;
  className?: string;
}

class Alert extends React.Component<AlertPropTypes, {}> {

  static defaultProps = {
    prefixCls: 'NEUI'
  }

  render () {
    const {prefixCls, className, children, onClose, show, ...others} = this.props
    const cls = classnames({
      [`${prefixCls}_modal`]: true,
      [className as string]: !!className
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
