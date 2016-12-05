/**
 * Created by kisnows on 2016/9/8.
 */
import React from 'react'
import classNames from 'classnames'

export default class Button extends React.Component {

  static propTypes = {
    disabled: React.PropTypes.bool,
    role: React.PropTypes.oneOf(['primary', 'secondary']),
    type: React.PropTypes.oneOf(['button', 'submit']),
    size: React.PropTypes.oneOf(['normal', 'small'])
  }

  static defaultProps = {
    disabled: false,
    role: 'primary',
    type: 'button',
    size: 'normal',
    children: '确定'
  }

  render() {
    const {role, type, size, disabled, className, children, ...others} = this.props
    const cls = classNames({
      ui_button: true,
      ui_button_primary: role === 'primary',
      ui_button_secondary: role === 'secondary',
      ui_button_small: size === 'small',
      ui_button_disabled: disabled,
      [className]: className
    })
    return (
      <div className="ui_button_container">
        <button className={cls}
          disabled={disabled}
          type={type}
          {...others}>
          {children}
        </button>
      </div>
    )
  }
}
