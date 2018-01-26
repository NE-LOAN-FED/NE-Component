import React from 'react'
import classNames from 'classnames'
import Animation from '../_utils/animation'
import Animate from 'rc-animate'
import { Cell, CellBody, CellFooter, Icon } from '../index'
import HOC from './CollapseHOC'

function List (props) {
  const {isCollapse, data, className, prefixCls, onSubComponentChange, ...others} = props
  const {title, content} = data
  const cls = classNames({
    [`${prefixCls}_collapse_list`]: true,
    is_active: !isCollapse,
    [className]: className
  })

  function FirstChild (props) {
    const childrenArray = React.Children.toArray(props.children)
    return childrenArray[0] || null
  }

  return (
    <div className={cls} {...others}>
      <Cell onClick={onSubComponentChange}>
        <CellBody>{title}</CellBody>
        <CellFooter>
          <Icon type='arrow'
            className={classNames({
              collapse: isCollapse,
              list_icon: true
            })} />
        </CellFooter>
      </Cell>
      <Animate animation={Animation} component={FirstChild}>
        {!isCollapse
          ? <div className='list_content_wrap'>
            <p className='list_content' key={this}>{content}</p>
          </div> : null}
      </Animate>
    </div>
  )
}

export default HOC()(List)
