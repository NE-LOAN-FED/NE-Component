/**
 * Created by kisnows on 2017/2/22.
 */
import PropTypes from 'prop-types';

import React, { Component } from 'react';
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
  Collapse,
  ActionSheet
} from '../../../src'

export default class ModalPage extends Component {
  constructor () {
    super()
    this.state = {
      phone: '',
      formData: {},
      msg: '',
      timeout: 2000,
      showToast: false,
      showLoading: true,
      showAlert: false,
      showActionSheet: false
    }
  }

  handleDialogConfirm = () => {
    this.setState({
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
  openActionSheet = () => {
    this.setState({
      showActionSheet: true
    })
  }
  handleActionClose = () => {
    this.setState({
      showActionSheet: false
    })
  }

  showToast = () => {
    this.setState({
      showToast: true,
      timeout: -1,
      msg: 'Jello'
    }, () => {
      setTimeout(() => {
        this.setState({
          showToast: true,
          timeout: 2000,
          msg: 'Hello World'
        })
      }, 2000)
    })
  }
  render () {
    const {msg, showToast, showModal,showLoading, showAlert, showActionSheet, timeout} = this.state
    return (
      <section>
        <Button onClick={this.showToast} />
        <Toast content={msg} show={showToast} onClose={this.closeToast} timeout={timeout} isLockScreen />
        <Toast content={msg} show={showLoading} onClose={this.closeToast} timeout={timeout}  icon='loading' isLockScreen />
        <div className='page--header'>
          <h1 className='page-title'>Modal</h1>
          <p className='page--desc'>模态窗</p>
        </div>
        <Button onClick={this.openAlert}>Click to open a Alert</Button>
        <Alert
          show={showModal}
          onClose={this.closeAlert}
          isClickMaskToClose
          className='test'
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
        <Button onClick={this.openActionSheet}>Click to open a ActionSheet</Button>
        <ActionSheet
          menus={[<a href='#form'>你好</a>, '我好']}
          show={showActionSheet}
          showCancel
          onClose={this.handleActionClose}
          onMenuClick={this.handleActionChange}
          isClickMaskToClose
          onMaskClick={e => console.log(e)}
        />
      </section>
    )
  }
}
