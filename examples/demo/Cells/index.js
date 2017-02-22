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

export default class ButtonPage extends Component {
  render() {
    return (
      <div>
        <h1>Cells</h1>
        <Cells>
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
        </Cells>
      </div>
    )
  }
}
