/**
 * Created by kisnows on 2016/9/12.
 */
import React from 'react'
import classNames from 'classnames'

export interface CellBodyProps {
  className?: string;
  children: JSX.Element;
}

export default class CellBody extends React.Component<CellBodyProps, any> {

  render () {
    const {className, children, ...others} = this.props
    const cls = classNames({
      NEUI_cell__bd: true,
      [className as string]: !!className
    })
    return (
      <div className={cls} {...others}>{
        children
      }</div>
    )
  }
}
