/**
 * Created by kisnows on 2016/9/22.
 */
import * as React from 'react'
import classNames from 'classnames'
import { BaseProps } from './PropsType'

export default class CellTip extends React.Component<BaseProps, any> {

  render () {
    const {className, children, ...others} = this.props
    const cls = classNames({
      NEUI_cells_tip: true,
      [className as string]: !!className
    })
    return (
      <div className={cls} {...others}>
        <span>{children}</span>
      </div>
    )
  }
}
