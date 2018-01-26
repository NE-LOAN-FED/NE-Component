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
} from '../../../src'

export default class CellsPage extends Component {
  render() {
    return (
      <section>
        <div className="page--header">
          <h1 className="page-title">Cells</h1>
          <p className="page--desc">列表</p>
        </div>

      </section>
    )
  }
}
