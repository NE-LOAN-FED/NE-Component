/**
 * Created by kisnows on 2016/12/26.
 */
import React from 'react'
import TestForm from '../../../components/Form/Form'
import Input from '../../../components/Form/Input'
import {Button, FormCell, CellHeader, Toast} from '../../../components'
import Logger from '../../../utils/log'


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
    logger.info('render', this.state.formData)
    console.log(isComplete)
    return (
      <section className="page-form-demo">
        <Toast content={msg}
               show={showToast}
               onClose={this.closeToast}
        />
        <p>page-form-demo</p>
        <TestForm
          onSubmit={this.handleSubmit}
          onFieldChange={this.handleFieldChange}
          onChange={this.handleChange}
          ref={(ref) => {
            this['$Form'] = ref
          } }
        >
          <FormCell>
            <CellHeader>Name</CellHeader>
            <_FieldInput type='text'
                         name='Name'
            />
          </FormCell>
          <FormCell cellsEnd>
            <CellHeader>Phone</CellHeader>
            <_FieldInput type='text'
                         name='phone'
                         validate={/^\d{11}$/}
            />
          </FormCell>
          <Button type="submit" disabled={!isComplete}>提交</Button>
        </TestForm>
      </section>
    )
  }
}

export default FormDemo
