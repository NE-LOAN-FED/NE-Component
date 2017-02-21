/**
 * Created by kisnows on 2017/2/17.
 */
import React, {Component, PropTypes} from 'react'
import List from './List'

export default class CollapseList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openListIdCollection: this.props.openListIdCollection || [],
      listCollection: this.props.listCollection || []
    }
  }

  static propTypes = {
    prefixCls: PropTypes.string,
    openListIdCollection: PropTypes.arrayOf(PropTypes.number),
    listCollection: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.node,
      content: PropTypes.node,
      isOpen: PropTypes.bool
    })).isRequired,
    accordion: PropTypes.bool,
    onListChange: PropTypes.func
  }

  static defaultProps = {
    prefixCls: 'NEUI',
  }
  handleListChange = (id, collapse) => {
    //TODO 把 openListIdCollection 改为不可重复的数据结构 set
    let {openListIdCollection, listCollection}= this.state
    const {accordion} = this.props
    listCollection[id]['collapse'] = collapse

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
    return listCollection.map((v, k) => {
      const isCollapse = openListIdCollection.indexOf(k) === -1
      return <List collapse={isCollapse}
                   title={v.title}
                   content={v.content}
                   onChange={this.handleListChange}
                   id={k}
                   key={k}/>
    })
  }

  render() {
    const Lists = this.renderList()
    const {prefixCls, openListIdCollection, listCollection, accordion, onListChange, ...others} = this.props
    return (
      <div {...others}>
        {Lists}
      </div>
    )
  }
}
