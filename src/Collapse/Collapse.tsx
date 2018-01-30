/**
 * Created by kisnows on 2017/2/17.
 */

import React from 'react'
import BasePropTypes from './PropTypes'
import Item from './Item'
import { WrapPropTypes } from './CollapseHOC'
import classnames from 'classnames'

export interface CollapsePropTypes extends BasePropTypes {
  prefixCls: string;
}

const noop = () => { }

export default class Collapse extends React.Component<CollapsePropTypes, any> {
  public static Item = Item
  static defaultProps = {
    prefixCls: 'NEUI',
    onListChange: noop
  }

  constructor (props) {
    super(props)
    this.state = {
      // 当前打开元素的集合
      activeIdList: this.props.activeIdList || []
    }
  }

  handleListChange = (id, active) => {
    // TODO 把 activeIdList 改为不可重复的数据结构 set
    let {activeIdList} = this.state
    const {accordion} = this.props

    function removeCollapseListId (id) {
      activeIdList = activeIdList.filter(value => value !== id)
      return activeIdList
    }

    function addIdToCollapseListId (id) {
      activeIdList.indexOf(id) === -1 && activeIdList.push(id)
    }

    if (accordion) {
      activeIdList = active ? [id] : removeCollapseListId(id)
    } else {
      active ? addIdToCollapseListId(id) : removeCollapseListId(id)
    }
    activeIdList = activeIdList.length ? activeIdList : []
    this.props.onListChange(id, active, activeIdList)
    this.setState({
      activeIdList: activeIdList
    })
  }
  renderList = () => {
    const {activeIdList} = this.state
    const {children} = this.props
    if (!children) return
    return React.Children.map(children, (child: React.ReactElement<WrapPropTypes>, index) => {
      if (typeof child === 'string' || typeof child === 'number') return child
      const id = child.key || index
      const isActive: boolean = activeIdList.indexOf(id) > -1
      return React.cloneElement(child, {
        onChange: this.handleListChange,
        id,
        isActive
      })
    })
  }

  render () {
    const Lists = this.renderList()
    const {prefixCls, activeIdList, accordion, onListChange, ...others} = this.props
    const cls = classnames([`${prefixCls}_collapse`], {
      [`${prefixCls}_collapse_active`]: activeIdList && activeIdList.length > 0
    })
    return (
      <div className={cls} {...others}>
        {Lists}
      </div>
    )
  }
}
