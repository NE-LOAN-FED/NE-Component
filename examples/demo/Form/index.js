/**
 * Created by kisnows on 2016/12/26.
 */
import React from 'react'
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
import Logger from '../../../utils/log'
import lang from '../../utils/lang'
import validate from '../../utils/validate'

const logger = new Logger('DEBUG', 'FormDemo')

class FormDemo extends React.Component {
  constructor() {
    super()
    this.state = {
      showInput: true,
      formData: {},
      msg: '',
      showToast: false
    }
  }

  componentDidMount() {
    const formData = this.$Form.data
    setTimeout(() => {
      this.setState({
        showInput: false,
        formData
      })
    }, 5000)
  }

  componentWillReceiveProps() {
    logger.log('componentWillReceiveProps')
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('TEST', 2)

    logger.log(nextState)
  }

  componentDidUpdate() {

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
    logger.log(`form submit, isValidate:${isValidate}, state:${state}, pureData:${pureData}`)
  }
  handleChange = (formData) => {
    logger.log('form change', formData)
    this.setState({
      formData
    })
  }
  handleFieldChange = (fieldData) => {
    logger.log('field change', fieldData)
  }
  handleInputChange = () => {
    logger.log('handleInputChange')
  }
  handleInputFocus = () => {
    logger.log('handleInputFocus')
  }
  handleInputBlur = () => {
    logger.log('handleInputBlur')
  }
  handleInputEmpty = () => {
    logger.log('handleInputEmpty')
  }
  closeToast = () => {
    this.setState({
      showToast: false
    })
  }

  render() {
    const {showInput, msg, showToast, formData} = this.state
    const {isComplete} = formData
    const genderData = [{
      name: '男',
      value: 0,
      disabled: true
    }, {
      name: '女',
      value: 1
    }]
    logger.info('render', this.state.formData)
    console.log(isComplete)
    return (
      <section className="page-form-demo">
        <div className="page--header">
          <h1 className="page-title">Form</h1>
          <p className="page--desc">表单组件，包括 Form, Input, Select, Checkbox。<br/> Form 组件包含了填写校验，错误提示等功能。</p>
        </div>
        <Toast content={msg}
               show={showToast}
               onClose={this.closeToast}
        />
        <Form
          onSubmit={this.handleSubmit}
          onFieldChange={this.handleFieldChange}
          onChange={this.handleChange}
          ref={(ref) => {
            this['$Form'] = ref
          } }
        >
          <FormCell>
            <CellHeader>Name</CellHeader>
            <Input type='text'
                   name='name'
                   errorMsg={lang.nameErrorMsg}
                   validate={validate.name}
            />
          </FormCell>
          <FormCell>
            <CellHeader>Phone</CellHeader>
            <Input type='tel'
                   name='phone'
                   validate={validate.phone}
                   errorMsg={lang.phoneErrorMsg}
            />
          </FormCell>
          <FormCell>
            <CellHeader>Verify Code</CellHeader>
            <Input type='number'
                   name='verifyCode'
                   errorMsg={lang.smsCodeErrorMsg}
                   validate={/\d{4}/}
            />
            <CellFooter><VerifyButton/></CellFooter>
          </FormCell>
          <FormCell>
            <CellHeader>Gender</CellHeader>
            <Select name='gender'
                    data={genderData}
                    required={false}
            />
          </FormCell>
          <FormCell>
            <CellBody><label htmlFor="is">Is yourself?</label></CellBody>
            <CellFooter><CheckBox name='is' id="is"/></CellFooter>
          </FormCell>
          <Button type="submit" disabled={!isComplete}>提交</Button>
        </Form>
      </section>
    )
  }
}

export default FormDemo
