/**
 * Created by kisnows on 2017/2/17.
 */
import React, {Component, PropTypes} from 'react'

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
    subComponent: PropTypes.element
  }

  static defaultProps = {
    prefixCls: 'NEUI',
  }

  handleListChange = (id, collapse) => {
    //TODO 把 openListIdCollection 改为不可重复的数据结构 set
    let {openListIdCollection, listCollection}= this.state
    const {accordion} = this.props
    listCollection[id]['isCollapse'] = collapse

    function removeCollapseListId() {
      return openListIdCollection = openListIdCollection.filter((value) => {
        return value !== id
      })
    }

    function addIdToCollapseListId(id) {
      openListIdCollection.indexOf(id) === -1 && openListIdCollection.push(id)
    }

    if (accordion) {
      openListIdCollection = collapse ?
        removeCollapseListId() : [id]
    } else {
      collapse ? removeCollapseListId() : addIdToCollapseListId(id)
    }
    openListIdCollection = openListIdCollection.length ? openListIdCollection : []
    this.props.onListChange(openListIdCollection)
    this.setState({
      openListIdCollection,
      listCollection
    })
  }
  renderList = () => {
    const {openListIdCollection, listCollection} = this.state
    const subComponent = this.props.subComponent
    return listCollection.map((v, k) => {
      v.isCollapse = openListIdCollection.indexOf(k) === -1
      return React.cloneElement(subComponent, {
        data: v,
        onChange: this.handleListChange,
        id: k,
        key: k,
      })
    })
  }

  render() {
    const Lists = this.renderList()
    const {prefixCls, openListIdCollection, listCollection, accordion, onListChange, subComponent, ...others} = this.props
    return (
      <div {...others}>
        {Lists}
      </div>
    )
  }
}
