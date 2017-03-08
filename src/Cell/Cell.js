/**
 * Created by hzyuanqi1 on 2016/9/12.
 */
import React from 'react'
import classNames from 'classnames'
const PropTypes = React.PropTypes
export default class Cell extends React.Component {
  static propTypes = {
    tip: PropTypes.bool,
    warning: PropTypes.bool
  }

  static defaultProps = {
    tip: false,
    warning: false
  }

  render() {
    const { className, children, tip, warning, ...others } = this.props
    const Component = this.props.href ? 'a' : this.props.htmlFor === 'undefined' ? 'div' : 'label'
    const cls = classNames({
      NEUI_cell: true,
      NEUI_cell_tip: tip,
      NEUI_cell_warning: warning,
      [className]: className
    })
    return (
      <Component className={cls} {...others}>
        {children}
      </Component>
    )
  }
}
