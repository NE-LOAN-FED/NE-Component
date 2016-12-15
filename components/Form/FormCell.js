/**
 * Created by hzyuanqi1 on 2016/9/20.
 */
import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

export default class FormCell extends React.Component {

  static propTypes = {
    isError: PropTypes.bool,
    cellsStart: PropTypes.bool,
    cellsEnd: PropTypes.bool
  }

  static defaultProps = {
    isError: false
  }

  render() {
    const {
      className, isError, children, cellsStart, cellsEnd, ...others
    } = this.props
    const cls = classNames({
      NEUI_cell: true,
      NEUI_cell_error: isError,
      NEUI_cell_start: cellsStart,
      NEUI_cell_end: cellsEnd,
      [className]: className
    })
    return (
      <div className={cls} {...others}>{children}</div>
    )
  }
}
