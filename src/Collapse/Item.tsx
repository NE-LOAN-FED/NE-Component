import * as React from 'react'
import classnames from 'classnames'
import Animate from 'rc-animate'
import { Cell, Icon } from '../index'
import HOC from './CollapseHOC'
import { CollapseSubProps as BaseProps } from './PropTypes'
import velocity from 'velocity-animate'

export interface CollapseSubProps extends BaseProps {
  className?: string;
  prefixCls?: string;
  toggle: () => void;
}

const animation = {
  enter (node, done) {

    node.style.display = 'none'
    velocity(node, 'slideDown', {
      duration: 300,
      complete: () => done()
    })
  },
  leave (node, done) {

    node.style.display = 'block'
     velocity(node, 'slideUp', {
      duration: 300,
      complete: () => done()
    })
  }
}

function Item (props: CollapseSubProps) {
  const {isActive, className, prefixCls = 'NEUI', toggle, title, children, id, ...others} = props
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
      <Cell onClick={toggle}>
        <Cell.Body>{title}</Cell.Body>
        <Cell.Footer>
          <Icon type='arrow'
                className={`${prefixCls}_collapse_item_icon`} />
        </Cell.Footer>
      </Cell>
      <Animate animation={animation} component={FirstChild}>
        {isActive
          ? <div className={`${prefixCls}_collapse_item_content`}>
            {children}
          </div> : null}
      </Animate>
    </div>
  )
}

export default HOC()(Item)
