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

export default class IconPage extends Component {
  render() {
    const iconTypeList = ['tip', 'del', 'arrow', 'tick', 'loading', 'wait', 'close', 'warning', 'success']
    const Icons = iconTypeList.map((v, k) => {
      return <Cell key={k}><CellHeader>{v}</CellHeader> <CellBody><Icon type={v}/></CellBody></Cell>
    })
    return (
      <section>
        <div className="page--header">
          <h1 className="page-title">Icon</h1>
          <p className="page--desc">固定的常用字体图标</p>
        </div>
        <Cells>
          {Icons}
        </Cells>
      </section>
    )
  }
}
