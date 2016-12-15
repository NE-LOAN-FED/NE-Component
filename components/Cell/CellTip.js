/**
 * Created by hzyuanqi1 on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

export default class CellTip extends Component {

  static propTypes = {}

  static defaultProps = {}

  render() {
    const {className, children, ...others} = this.props
    const cls = classNames({
      NEUI_cells_tip: true,
      [className]: className
    })
    return (
      <div className={cls} {...others}>
      <span>{children}</span>
      </div>
    )
  }
}
