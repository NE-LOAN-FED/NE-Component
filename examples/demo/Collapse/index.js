/**
 * Created by kisnows on 2017/2/22.
 */
import PropTypes from 'prop-types';

import React, { Component } from 'react';
import {Link} from 'react-router'
import {
  Form,
  FormCell,
  Input,
  Select,
  CheckBox,
  Cells,
  Cell,
  CellHeader,
  Icon,
  CellBody,
  CellFooter,
  Panel,
  DatePicker,
  Picker,
  Modal,
  Alert,
  VerifyButton,
  Toast,
  Button
} from '../../../src'
import Collapse from '../../../src/Collapse'
import List from '../../../src/Collapse/List'
import './Collapse.scss'

const questions = [
  {
    q: 'Q：客服电话是多少？',
    a: 'A：客服热线：400-0881188  服务时间：工作日09:30-12:00 ;13:30-18:00'
  }, {
    q: 'Q：申请的条件是什么？',
    a: 'A：年龄在18-60周岁的在职员工。'
  }, {
    q: 'Q：申请借款需要哪些材料？',
    a: 'A：只需要储蓄卡和身份证。'
  }
]

const collapseListData = questions.map((v, k) => {
  const obj = {
    title: v.q,
    content: v.a
  }
  return obj
})

export default class CollapsePage extends Component {
  handleCollapseListChange = (id, collapse, openListIdCollection) => {
    console.log(id, collapse, openListIdCollection)
  }

  render() {
    const CollapseSubComponent = <List />
    return (
      <section className='page_collapse'>
        <div className='page--header'>
          <h1 className='page-title'>Collapse</h1>
          <p className='page--desc'>折叠列表</p>
        </div>
        <h3>Normal</h3>
        <Collapse listCollection={collapseListData}
          onListChange={this.handleCollapseListChange}
        />
        <h3>Accordion</h3>
        <Collapse listCollection={collapseListData}
          accordion
          onListChange={this.handleCollapseListChange}
        />
      </section>
    )
  }
}
