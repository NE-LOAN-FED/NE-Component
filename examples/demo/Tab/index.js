/**
 * Created by hzyanming on 17/6/28.
 */
import React, { Component } from 'react'
import {
  Tab
} from '../../../src'

export default class TabPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabs: [
        { title: '借款中', disabled: false },
        { title: '审核中', disabled: false },
        { title: '还款中', disabled: true },
        { title: '放款中', disabled: false}
      ]
    }
  }

  onTabChange = (index) => {
    console.log('current tab:', index)
  }

  render() {
    const { tabs } = this.state
    return (
      <section>
        <div className="page--header">
          <h1 className="page-title">Tab</h1>
          <p className="page--desc">选项卡列表</p>
        </div>
        <Tab defaultIndex={1} onChange={this.onTabChange}>
          {tabs.map((item, index) => {
            return <Tab.Item title={item.title} key={index} disabled={item.disabled}>内容：{item.title}</Tab.Item>
          })}
        </Tab>
      </section>
    )
  }
}
