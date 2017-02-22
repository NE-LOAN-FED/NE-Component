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
} from '../../../components'

export default class PickerPage extends Component {
  render() {
    return(
      <div>
        <div className="page--header">
          <h1 className="page-title">Picker</h1>
          <p className="page--desc">选择器</p>
        </div>
        <Cell>
          <CellHeader>DatePicker</CellHeader>
          <CellBody>
            <DatePicker/>
          </CellBody>
        </Cell>
      </div>
    )
  }
}
