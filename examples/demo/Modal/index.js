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
  Dialog,
  Alert,
  VerifyButton,
  Toast,
  Button,
  Collapse
} from '../../../src'

export default class ModalPage extends Component {
  constructor() {
    super()
    this.state = {
      phone: '',
      formData: {},
      msg: '',
      showToast: false,
      showAlert: false
    }
  }

  handleDialogConfirm = () => {
    this.setState({
      showAlert: false,
      showToast: true,
      msg: 'HaHa'
    })
  }

  handleDialogCancel = () => {
    this.setState({
      showAlert: false,
      showToast: true,
      msg: 'This is mean nothing to you.'
    })
  }
  openAlert = () => {
    this.setState({
      showModal: true
    })
  }
  closeAlert = () => {
    this.setState({
      showModal: false
    })
  }
  openDialog = () => {
    this.setState({
      showAlert: true
    })
  }
  closeToast = () => {
    this.setState({
      showToast: false
    })
  }

  render() {
    const { msg, showToast, showModal, showAlert } = this.state
    return (
      <section>
        <Toast content={msg}
          show={showToast}
          onClose={this.closeToast}
        />
        <div className='page--header'>
          <h1 className='page-title'>Modal</h1>
          <p className='page--desc'>模态窗</p>
        </div>
        <Button onClick={this.openAlert}>Click to open a Alert</Button>
        <Alert
          show={showModal}
          onClose={this.closeAlert}
        >
          <h2>This is a Alert.</h2>
        </Alert>
        <Button onClick={this.openDialog}>Click to open a Dialog</Button>
        <Dialog
          headerContent={'Question'}
          show={showAlert}
          confirmContent={'Yes'}
          cancelContent={'No'}
          onConfirm={this.handleDialogConfirm}
          onCancel={this.handleDialogCancel}
        >
          Are you a beautiful girl?
        </Dialog>
      </section>
    )
  }
}
