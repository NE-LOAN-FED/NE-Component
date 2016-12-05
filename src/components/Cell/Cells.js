/**
 * Created by kisnows on 2016/9/12.
 */
import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

export default class Cells extends React.Component {

  static propTypes = {
  }

  static defaultProps = {}

  render() {
    const {className, children, ...others} = this.props
    const cls = classNames({
      ui_cells: true,
      [className]: className
    })
    return (
      <div className={cls} {...others}>
        {children}
      </div>
    )
  }
}
