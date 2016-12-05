/**
 * Created by kisnows on 2016/9/20.
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
      ui_cell: true,
      ui_cell_error: isError,
      ui_cell_start: cellsStart,
      ui_cell_end: cellsEnd,
      [className]: className
    })
    return (
      <div className={cls} {...others}>{children}</div>
    )
  }
}
