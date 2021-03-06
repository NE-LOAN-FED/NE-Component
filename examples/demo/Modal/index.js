/**
 * Created by kisnows on 2017/2/22.
 */
import React, { Component } from 'react'
import {
  Toast,
  Button,
  Dialog,
  Alert,
  ActionSheet,
  CellInput
} from '../../../src'
export default class ModalPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      phone: '',
      formData: {},
      msg: '',
      timeout: 2000,
      showToast: false,
      showLoading: true,
      showAlert: false,
      showActionSheet: false,
      showPWD: false
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
  openCellInput = () => {
    this.setState({
      showPWD: true
    })
  }
  handelCellInputClose = () => {
    this.setState({
      showPWD: false
    })
  }
  showToast = () => {
    this.setState(
      {
        showToast: true,
        timeout: -1,
        msg: 'Jello'
      },
      () => {
        setTimeout(() => {
          this.setState({
            showToast: true,
            timeout: 2000,
            msg: 'Hello World'
          })
        }, 2000)
      }
    )
  }

  handleActionChange = (key) => {
    console.log('Menu Click', key)
  }
  render () {
    const {
      msg,
      showToast,
      showModal,
      showAlert,
      showActionSheet,
      timeout
    } = this.state
    return (
      <section>
        <Button onClick={this.showToast} />
        <Toast
          content={msg}
          show={showToast}
          onClose={this.closeToast}
          timeout={timeout}
          isLockScreen
        />
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
        <Button onClick={this.openActionSheet}>
          Click to open a ActionSheet
        </Button>
        <ActionSheet
          menus={[<a href='#form'>你好</a>, '我好']}
          show={showActionSheet}
          showCancel
          onClose={this.handleActionClose}
          onMenuClick={this.handleActionChange}
          isClickMaskToClose
          onMaskClick={e => console.log(e)}
        />
        <Dialog
          headerContent={'输入密码'}
          show={this.state.showPWD}
          confirmContent={'Yes'}
          onConfirm={this.handelCellInputClose}
        >
          <CellInput />
        </Dialog>
        <Button onClick={this.openCellInput}>PWD Dialog</Button>
      </section>
    )
  }
}
