/**
 * Created by kisnows on 2016/9/12.
 */
import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

export default class Cell extends React.Component {

  static propTypes = {}

  static defaultProps = {}

  render() {
    const {className, children, cellsStart, cellsEnd, ...others} = this.props
    const Component = this.props.href ? 'a' : this.props.htmlFor !== 'undefined' ? 'label' : 'div'
    const cls = classNames({
      ui_cell: true,
      ui_cell_start: cellsStart,
      ui_cell_end: cellsEnd,
      [className]: className
    })
    return (
      <Component className={cls} {...others}>
        {children}
      </Component>
    )
  }
}
