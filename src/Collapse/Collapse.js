/**
 * Created by kisnows on 2017/2/17.
 */
import React, { Component, PropTypes } from 'react'
import List from './List'
const noop = () => { }
export default class Collapse extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // 当前打开元素的集合
      openListIdCollection: this.props.openListIdCollection || [],
      // SubComponent 渲染所需要的数据集合
      listCollection: this.props.listCollection || []
    }
  }

  static propTypes = {
    prefixCls: PropTypes.string,
    openListIdCollection: PropTypes.arrayOf(PropTypes.number),
    listCollection: PropTypes.array.isRequired,
    // 手风琴模式
    accordion: PropTypes.bool,
    onListChange: PropTypes.func,
    subComponent: PropTypes.func
  }

  static defaultProps = {
    prefixCls: 'NEUI',
    subComponent: List,
    onListChange: noop
  }

  handleListChange = (id, collapse) => {
    // TODO 把 openListIdCollection 改为不可重复的数据结构 set
    let { openListIdCollection, listCollection } = this.state
    const { accordion } = this.props
    listCollection[id]['isCollapse'] = collapse

    function removeCollapseListId(id) {
      openListIdCollection = openListIdCollection.filter(value => value !== id)
      return openListIdCollection
    }

    function addIdToCollapseListId(id) {
      openListIdCollection.indexOf(id) === -1 && openListIdCollection.push(id)
    }

    if (accordion) {
      openListIdCollection = collapse
        ? removeCollapseListId(id) : [id]
    } else {
      collapse ? removeCollapseListId(id) : addIdToCollapseListId(id)
    }
    openListIdCollection = openListIdCollection.length ? openListIdCollection : []
    this.props.onListChange(openListIdCollection)
    this.setState({
      openListIdCollection,
      listCollection
    })
  }
  renderList = () => {
    const { openListIdCollection, listCollection } = this.state
    const SubComponent = this.props.subComponent
    return listCollection.map((v, k) => {
      v.isCollapse = openListIdCollection.indexOf(k) === -1
      return <SubComponent
        data={v}
        onChange={this.handleListChange}
        id={v.id || k}
        key={k}
      />
    })
  }

  render() {
    const Lists = this.renderList()
    const { prefixCls, openListIdCollection, listCollection, accordion, onListChange, subComponent, ...others } = this.props
    return (
      <div {...others}>
        {Lists}
      </div>
    )
  }
}
