/**
 * Created by kisnows on 2017/2/22.
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
  Collapse
} from '../../../src'

export default class PanelPage extends Component {
  render() {
    return(
      <section>
        <div className="page--header">
          <h1 className="page-title">Panel</h1>
          <p className="page--desc">信息展示面板</p>
        </div>
        <Panel className="panel">
          <Panel.Title>还款详情</Panel.Title>
          <Panel.Item label="还款银行卡">
            <Panel.Content>Content</Panel.Content>
          </Panel.Item>
          <Panel.Item label="初始还款计划">
            <Panel.Content><a href="javascript:">查看</a></Panel.Content>
          </Panel.Item>
          <Panel.Button>查看更多</Panel.Button>
          <Panel.Driver />
          <Panel.Title>借款详情</Panel.Title>
          <Panel.Item label="借款编号">
            <Panel.Content>Content</Panel.Content>
          </Panel.Item>
          <Panel.Item label="借款金额">
            <Panel.Content>Content</Panel.Content>
          </Panel.Item>
        </Panel>
      </section>
    )
  }
}
