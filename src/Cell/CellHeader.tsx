/**
 * Created by kisnows on 2016/9/12.
 */
import * as React from 'react'
import classNames from 'classnames'
import { BaseProps } from './PropsType'

export default class CellHeader extends React.Component<BaseProps, any> {
  render () {
    const {className, children, ...others} = this.props
    const cls = classNames({
      NEUI_cell__hd: true,
      [className as string]: !!className
    })
    return (
      <div className={cls} {...others}>
        {children}
      </div>
    )
  }
}
