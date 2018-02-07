/**
 * Created by kisnows on 2016/9/8.
 */

import React from 'react'
import classnames from 'classnames'
import BasePropTypes from './PropTypes'

export interface ButtonProps extends BasePropTypes {
  className?: string;
}

export default class Button extends React.Component<ButtonProps, {}> {

  static defaultProps = {
    disabled: false,
    role: 'primary',
    type: 'button',
    size: 'normal',
    style: 'normal',
    children: '确定'
  }

  render () {
    const {role, type, size, disabled, style, className, children, ...others} = this.props
    const cls = classnames('NEUI_button', {
      NEUI_button_style_normal: style === 'normal',
      NEUI_button_style_rightAngle: style === 'rightAngle',
      NEUI_button_primary: role === 'primary',
      NEUI_button_secondary: role === 'secondary',
      NEUI_button_small: size === 'small',
      NEUI_button_disabled: disabled,
      [className as string]: !!className
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
