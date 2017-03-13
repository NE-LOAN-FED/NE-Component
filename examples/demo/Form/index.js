/**
 * Created by kisnows on 2016/12/26.
 */
import React from 'react'
import {
  Form,
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
import Logger from '../../../src/_utils/log'
import lang from '../../utils/lang'
import validate from '../../utils/validate'
import {removeBlack, formatterToBankCard} from '../../utils/formatter'

const logger = new Logger('DEBUG', 'FormDemo')

class FormDemo extends React.Component {
  constructor() {
    super()
    this.state = {
      showInput: true,
      formData: {
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
        card: {}
      },
      msg: '',
      isComplete: false,

      showToast: false
    }
    this.timer = null
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
      formData: formData.data,
      isComplete: formData.isComplete
    })
  }
  handleFieldChange = (FieldData) => {
    logger.log('FieldChange', FieldData)
  }

  closeToast = () => {
    this.setState({
      showToast: false
    })
  }

  render() {
    const { showInput, msg, showToast, formData, isComplete } = this.state
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
          onFieldChange={this.handleFieldChange}
          onChange={this.handleChange}
          state={formData}
        >
          <CellTip>Input</CellTip>
          <Cells>
            <Cell warning={formData.name.isError}>
              <CellHeader>Name</CellHeader>
              <Input type='text'
                name='name'
                errorMsg={lang.nameErrorMsg}
                validate={validate.name}
                value={formData.name.value}
                data-index='1'
              />
            </Cell>
            <Cell warning={formData.phone.isError}>
              <CellHeader>Phone</CellHeader>
              <Input type='tel'
                name='phone'
                validate={validate.phone}
                errorMsg={lang.phoneErrorMsg}
                value={formData.phone.value}
              />
            </Cell>
            <Cell warning={formData.card.isError}>
              <CellHeader>Card</CellHeader>
              <Input type='tel'
                name='card'
                validate={validate.card}
                errorMsg={lang.card}
                value={formData.card.value}
                formatter={formatterToBankCard}
                parser={removeBlack}
              />
            </Cell>
            <Cell warning={formData.verifyCode.isError}>
              <CellHeader>Verify Code</CellHeader>
              <Input type='number'
                name='verifyCode'
                errorMsg={lang.smsCodeErrorMsg}
                validate={/\d{4}/}
                value={formData.verifyCode.value}
              />
              <CellFooter><VerifyButton /></CellFooter>
            </Cell>
          </Cells>
          <CellTip>Select</CellTip>
          {
            showInput ? <Cells>
              <Cell warning={formData.gender.isError}>
                <CellHeader>Gender</CellHeader>
                <Select name='gender'
                  data={genderData}
                  value={formData.gender.value}
                />
              </Cell>
            </Cells> : null
          }
          <CellTip>CheckBox</CellTip>
          <Cells>
            <Cell htmlFor='is'>
              <CellBody>Is yourself?</CellBody>
              <CellFooter><CheckBox name='is' id='is' value={formData.is.value} /></CellFooter>
            </Cell>
          </Cells>
          <Button type='submit' disabled={!isComplete}>提交</Button>
        </Form>
      </section>
    )
  }
}

export default FormDemo
