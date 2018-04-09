/**
 * Created by kisnows on 2017/2/22.
 */
import React, { Component } from 'react'
import { Collapse } from '../../../src'
// import './Collapse.scss'

const questions = [
  {
    q: 'Q：客服电话是多少？',
    a: 'A：客服热线：400-88888888  服务时间：工作日09:30-12:00 ;13:30-18:00'
  },
  {
    q: 'Q：申请的条件是什么？',
    a: 'A：年龄在18-60周岁的在职员工。'
  },
  {
    q: 'Q：申请借款需要哪些材料？',
    a: 'A：只需要储蓄卡和身份证。'
  }
]

const collapseListData = questions.map((v, k) => {
  return {
    title: v.q,
    content: v.a
  }
})

export default class CollapsePage extends Component {
  handleCollapseListChange = (id, collapse, openListIdCollection) => {
    console.log(id, collapse, openListIdCollection)
  }

  render () {
    return (
      <section className='page_collapse'>
        <div className='page--header'>
          <h1 className='page-title'>Collapse</h1>
          <p className='page--desc'>折叠列表</p>
        </div>
        <h3>Normal</h3>
        <Collapse activeIdList={['0']} onListChange={this.handleCollapseListChange}>
          {collapseListData.map((data, index) => {
            return <Collapse.Item title={data.title} key={index}>
              {data.content}
            </Collapse.Item>
          })}
        </Collapse>
        <h3>Accordion</h3>
        <Collapse accordion onListChange={this.handleCollapseListChange}>
          {collapseListData.map((data, index) => {
            return <Collapse.Item title={data.title} key={index} >
              {data.content}
            </Collapse.Item>
          })}
        </Collapse>
      </section>
    )
  }
}
