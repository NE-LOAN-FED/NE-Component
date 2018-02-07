import React from 'react'
import classnames from 'classnames'
import Animation from '../_utils/animation'
import Animate from 'rc-animate'
import { Cell, Icon } from '../index'
import HOC from './CollapseHOC'
import { CollapseSubProps as BaseProps } from './PropTypes'

export interface CollapseSubProps extends BaseProps {
  className?: string;
  prefixCls?: string;
}

function Item (props: CollapseSubProps) {
  const {isActive, className, prefixCls = 'NEUI', onListChange, title, children, id, ...others} = props
  const cls = classnames([`${prefixCls}_collapse_item`], {
    [`${prefixCls}_collapse_item_active`]: isActive,
    [className as string]: !!className
  })

  function FirstChild (props) {
    const childrenArray = React.Children.toArray(props.children)
    return childrenArray[0] || null
  }

  return (
    <div className={cls} {...others}>
      <Cell onClick={onListChange}>
        <Cell.Body>{title}</Cell.Body>
        <Cell.Footer>
          <Icon type='arrow'
                className={`${prefixCls}_collapse_item_icon`} />
        </Cell.Footer>
      </Cell>
      <Animate animation={Animation} component={FirstChild}>
        {/* TODO: 改为通过 class 隐藏 */}
        {isActive
          ? <div className={`${prefixCls}_collapse_item_content`}>
            {children}
          </div> : null}
      </Animate>
    </div>
  )
}

export default HOC()(Item)
