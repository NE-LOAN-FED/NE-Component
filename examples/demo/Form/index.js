/**
 * Created by kisnows on 2016/12/26.
 */
import React from 'react'
import {
  Form,
  Input,
  Select,
  CheckBox,
  CellInput,
  Cells,
  Cell,
  Icon,
  Modal,
  Alert,
  VerifyButton,
  Toast,
  Button
} from '../../../lib'
import Logger from '../../../src/_utils/log'
import lang from '../../utils/lang'
import validate from '../../utils/validate'
import { removeBlack, formatterToBankCard } from '../../utils/formatter'

const logger = new Logger('DEBUG', 'FormDemo')

class FormDemo extends React.Component {
  constructor() {
    super()
    this.state = {
      showInput: false,
      name: {
        value: '抹桥'
      },
      phone: {
        value: '13333333333'
      },
      verifyCode: {
        value: 3303
      },
      gender: {},
      is: {
        value: true
      },
      card: {},
      msg: '',
      isComplete: false,
      showToast: false
    }
  }

  componentWillMount() {
    logger.log('WillMount', this.state)
  }

  componentDidMount() {
    logger.log('DidMount', this.state)
  }

  componentWillReceiveProps() {
    logger.log('componentWillReceiveProps')
  }

  componentWillUpdate(nextProps, nextState) {
    logger.log('WillUpdate', nextState)
  }

  componentDidUpdate() {
    logger.log('DidUpdate', this.state)
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  handleSubmit = (isValidate, state, pureData) => {
    if (!isValidate) {
      this.setState({
        showToast: true,
        msg: state.errorMsgList[0]
      })
    } else {
      this.setState({
        showToast: true,
        msg: '正在提交'
      })
    }
    logger.log(`form submit, isValidate:${isValidate},`, 'state:', state, 'pureData:', pureData)
  }
  handleChange = (formData) => {
    logger.log('form change', formData)
    this.setState({
      ...formData.data,
      isComplete: formData.isComplete
    })
  }
  handleFieldChange = (FieldData) => {
    logger.log('FieldChange', FieldData)
    switch (FieldData.name) {
      case 'card':
        this.setState({
          showToast: false,
          msg: '测试'
        })
        break
    }
  }

  closeToast = () => {
    this.setState({
      showToast: false
    })
  }

  render() {
    const { showInput, msg, showToast, isComplete } = this.state
    const genderData = [{
      name: '男',
      value: 0,
      disabled: true
    }, {
      name: '女',
      value: 1
    }]
    return (
      <section className='page-form-demo'>
        <div className='page--header'>
          <h1 className='page-title'>Form</h1>
          <p className='page--desc'>表单组件，包括 Form, Input, Select, Checkbox。<br /> Form 组件包含了填写校验，错误提示等功能。</p>
        </div>
        <Toast content={msg}
          show={showToast}
          onClose={this.closeToast}
        />
        <Form
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          onFieldChange={this.handleFieldChange}
        >
          <Cell.Tip>Input</Cell.Tip>
          <Cells>
            <Cell warning={this.state.name.isError}>
              <Cell.Header>Name</Cell.Header>
              <Input type='text'
                name='name'
                errorMsg={lang.nameErrorMsg}
                validate={validate.name}
                value={this.state.name.value}
                data-index='1'
              />
            </Cell>
            <Cell warning={this.state.phone.isError}>
              <Cell.Header>Phone</Cell.Header>
              <Input type='tel'
                name='phone'
                validate={validate.phone}
                errorMsg={lang.phoneErrorMsg}
                value={this.state.phone.value}
              />
            </Cell>
            <Cell warning={this.state.card.isError}>
              <Cell.Header>Card</Cell.Header>
              <Input type='tel'
                name='card'
                validate={validate.card}
                errorMsg={lang.card}
                value={this.state.card.value}
                formatter={formatterToBankCard}
                parser={removeBlack}
              />
            </Cell>
            <Cell warning={this.state.verifyCode.isError}>
              <Cell.Header>Verify Code</Cell.Header>
              <Input type='number'
                name='verifyCode'
                errorMsg={lang.smsCodeErrorMsg}
                validate={/\d{4}/}
                value={this.state.verifyCode.value}
              />
              <Cell.Footer><VerifyButton /></Cell.Footer>
            </Cell>
          </Cells>
          <Cell.Tip>Select</Cell.Tip>
          {
            showInput ? <Cells>
              <Cell warning={this.state.gender.isError}>
                <Cell.Header>Gender</Cell.Header>
                <Select name='gender'
                  data={genderData}
                  value={this.state.gender.value}
                />
              </Cell>
            </Cells> : null
          }
          <Cell.Tip>CheckBox</Cell.Tip>
          <Cells>
            <Cell htmlFor='is'>
              <Cell.Body>Is yourself?</Cell.Body>
              <Cell.Footer><CheckBox name='is' id='is' value={this.state.is.value} /></Cell.Footer>
            </Cell>
          </Cells>
          <Button type='submit' disabled={!isComplete}>提交</Button>
        </Form>
      </section>
    )
  }
}

export default FormDemo
