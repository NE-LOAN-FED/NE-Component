/**
 * Created by kisnows on 2016/9/12.
 */
import * as React from 'react'
import classNames from 'classnames'
import { CellProps as BaseProps } from './PropsType'
import CellBody from './CellBody'
import CellHeader from './CellHeader'
import CellFooter from './CellFooter'
import CellTip from './CellTip'

export interface CellProps extends BaseProps {
  className?: string;
  href?: string;
  htmlFor?: string;
  onClick?: (e: object) => void;
}

export default class Cell extends React.Component<CellProps, any> {
  static Body = CellBody
  static Header = CellHeader
  static Footer = CellFooter
  static Tip = CellTip
  static defaultProps = {
    tip: false,
    warning: false
  }

  render () {
    const {className, children, tip, warning, ...others} = this.props
    const Component = this.props.href ? 'a' : this.props.htmlFor === 'undefined' ? 'div' : 'label'
    const cls = classNames({
      NEUI_cell: true,
      NEUI_cell_tip: tip,
      NEUI_cell_warning: warning,
      [className as string]: !!className
    })
    return (
      <Component className={cls} {...others}>
        {children}
      </Component>
    )
  }
}
