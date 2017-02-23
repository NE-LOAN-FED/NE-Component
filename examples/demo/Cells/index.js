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
  CellTip,
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
} from '../../../components'

export default class CellsPage extends Component {
  render() {
    return (
      <section>
        <div className="page--header">
          <h1 className="page-title">Cells</h1>
          <p className="page--desc">列表</p>
        </div>
        <Cells>
          <CellTip>完整的 Cell</CellTip>
          <Cell>
            <CellHeader>Header</CellHeader>
            <CellBody>Body</CellBody>
            <CellFooter>Footer</CellFooter>
          </Cell>
          <Cell>
            <CellHeader>Header</CellHeader>
            <CellBody>Body</CellBody>
            <CellFooter>Footer</CellFooter>
          </Cell>
          <CellTip>不完整的</CellTip>
          <Cell>
            <CellHeader>Header</CellHeader>
            <CellBody>Body</CellBody>
          </Cell>
          <Cell>
            <CellHeader>Header</CellHeader>
            <CellFooter>Footer</CellFooter>
          </Cell>
          <CellTip>带链接的</CellTip>
          <Cell href="/#/">
            <CellHeader>Go Home</CellHeader>
            <CellFooter><Icon type={'arrow'}/></CellFooter>
          </Cell>
        </Cells>
      </section>
    )
  }
}
