import * as React from 'react'
import classnames from 'classnames'
import ModalHOC from '../Modal'
import BasePropTypes from './PropTypes'

const noop = () => { }

export interface DialogPropTypes extends BasePropTypes {
  prefixCls?: string;
  className?: string;
}

class Dialog extends React.Component<DialogPropTypes, any> {

  static defaultProps = {
    prefixCls: 'NEUI',
    onConfirm: noop,
    onCancel: noop
  }

  render () {
    const {prefixCls, confirmContent, headerContent, onConfirm, onCancel, cancelContent, className, onClose, show, ...others} = this.props
    const confirmEle = confirmContent
      ? <button onClick={onConfirm} className={`${prefixCls}_dialog_confirm_button`}>{confirmContent}</button> : null
    const cancelEle = cancelContent
      ? <button onClick={onCancel} className={`${prefixCls}_dialog_cancel_button`}>{cancelContent}</button> : null
    const header = headerContent ? (
      <div className={`${prefixCls}_dialog_header`}>
        <h4 className={`${prefixCls}_dialog_header_content`}>
          {headerContent}
        </h4>
      </div>
    ) : null
    const content = this.props.children ? (
      <div className={`${prefixCls}_dialog_content`}>
        {this.props.children}
      </div>
    ) : null
    const cls = classnames({
      [`${prefixCls}_dialog`]: true,
      [className as string]: !!className
    })
    return (
      <div className={cls} {...others}>
        {header}
        {content}
        <div className={`${prefixCls}_dialog_confirm_box`}>
          {cancelEle}
          {confirmEle}
        </div>
      </div>
    )
  }
}

export default ModalHOC()(Dialog)
