/**
 * Created by kisnows on 2017/2/22.
 */
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
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
  NoticeBar
} from '../../../src'

export default class NoticeBarPage extends Component {
  render() {
    return (
      <section>
        <div className='page--header'>
          <h1 className='page-title'>NoticeBar</h1>
          <p className='page--desc'>按钮</p>
        </div>
        <NoticeBar>
        截止3月21日，您已逾期￥2,010.00。将尝试从招商银行储蓄
卡（1114）自动扣款，否则将产生更多罚息。
        </NoticeBar>
        <div style={{ height: 30 }} />
        <NoticeBar type='closable'>
          这是一条可关闭的公告栏
        </NoticeBar>
        <div style={{ height: 30 }} />
        <NoticeBar
          icon={<Icon type='tip' />}
        >
          这是一条可定制icon的公告栏
        </NoticeBar>
        <div style={{ height: 30 }} />
        <NoticeBar
          type='link'
          icon={<Icon type='tip' />}
        >
          这一条跳转至链接
        </NoticeBar>
      </section>
    )
  }
}
