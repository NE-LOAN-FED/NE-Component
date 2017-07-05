/**
 * Created by hzyanming on 17/6/28.
 */
import React, { Component } from 'react'
import {
  Tab,
  Button
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
      ],
      activeIndex: 0
    }
  }

  onTabChange = (index) => {
    console.log('current tab:', index)
  }

  onControlledTabChange = (index) => {
    this.setState({
      activeIndex: index
    })
  }

  handleTabChange = () => {
    this.setState({
      activeIndex: 3
    })
  }

  render() {
    const { tabs, activeIndex } = this.state
    return (
      <section className='page_collapse'>
        <div className='page--header'>
          <h1 className='page-title'>Tab</h1>
          <p className='page--desc'>选项卡列表</p>
        </div>
        <h3>Normal</h3>
        <Tab defaultActiveIndex='key1' onChange={this.onTabChange}>
          {tabs.map((item, index) => {
            return <Tab.Item title={item.title} key={`key${index}`} disabled={item.disabled}>内容：{item.title}</Tab.Item>
          })}
        </Tab>
        <h3>Controlled</h3>
        <Tab activeIndex={activeIndex} onChange={this.onControlledTabChange}>
          {tabs.map((item, index) => {
            return <Tab.Item title={item.title} key={index} disabled={item.disabled}>内容：{item.title}</Tab.Item>
          })}
        </Tab>
        <Button onClick={this.handleTabChange}>放款中</Button>
      </section>
    )
  }
}
