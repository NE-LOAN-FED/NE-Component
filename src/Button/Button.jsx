/**
 * Created by hzyuanqi1 on 2016/9/8.
 */
import React from 'react'
import classNames from 'classnames'

export default class Button extends React.Component {

  static propTypes = {
    disabled: React.PropTypes.bool,
    role: React.PropTypes.oneOf(['primary', 'secondary']),
    type: React.PropTypes.oneOf(['button', 'submit']),
    size: React.PropTypes.oneOf(['normal', 'small']),
    style: React.PropTypes.oneOf(['normal', 'rightAngle'])
  }

  static defaultProps = {
    disabled: false,
    role: 'primary',
    type: 'button',
    size: 'normal',
    style: 'normal',
    children: '确定'
  }

  render() {
    const {role, type, size, disabled, style, className, children, ...others} = this.props
    const cls = classNames({
      NEUI_button: true,
      NEUI_button_style_normal: style === 'normal',
      NEUI_button_style_rightAngle: style === 'rightAngle',
      NEUI_button_primary: role === 'primary',
      NEUI_button_secondary: role === 'secondary',
      NEUI_button_small: size === 'small',
      NEUI_button_disabled: disabled,
      [className]: className
    })
    return (
      <button className={cls}
              disabled={disabled}
              type={type}
              {...others}>
        {children}
      </button>
    )
  }
}
