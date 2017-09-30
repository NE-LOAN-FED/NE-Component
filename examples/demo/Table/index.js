/*
 * @Author: hzzhanfenghai 
 * @Date: 2017-07-06
 * @Last Modified by:   hzzhanfenghai 
 */

import React, {Component, PropTypes} from 'react'
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
  Button,
  Collapse,
  Table
} from '../../../src'

export default class ButtonPage extends Component {
  render() {
    const columns = [{
      title: '姓名',
      name: 'name'
    }, {
      title: '年龄',
      name: 'age'
    }]
    const data = [{
      name: '小贷',
      age: '2'
    }, {
      name: '金融',
      age: '5'
    }]
    return(
      <section>
        <div className="page--header">
          <h1 className="page-title">Table</h1>
          <p className="page--desc">表格</p>
        </div>
        <p>有边框</p>
        <Table columns={columns} data={data} cellBorder={true}></Table>
        <p>无边框</p>
        <Table columns={columns} data={data} cellBorder={false}></Table>
        <p>自定义</p>
        <Table>
          <thead>
            <tr style={{'backgroundColor': 'rgba(247,247,247,1)'}}>
              <th>姓名</th>
              <th>年龄</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>网易</td>
              <td>20</td>
            </tr>
            <tr>
              <th>金融</th>
              <th>5</th>
            </tr>
          </tbody>
        </Table>
      </section>
    )
  }
}
