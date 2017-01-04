/**
 * Created by kisnows on 2016/12/26.
 */
import React from 'react'
import TestForm from '../../../components/Form/TestForm'
import Form from '../../../components/Form/Form'
import Input from '../../../components/Form/TestInput'
import createFormItem from '../../../components/Form/createFormItem'
import Field from '../../../components/Form/Field.js'
import classnames from 'classnames'
import Logger from '../../../utils/log'


const logger = new Logger('DEBUG', 'FormDemo')

class FormDemo extends React.Component {
  constructor() {
    super()
    this.state = {
      formState: {}
    }
  }

  componentDidMount() {
  }

  handleSubmit = (isValidate, state, pureData) => {
    logger.log('form submit', isValidate, state, pureData)
  }
  handleChange = (formData) => {
    logger.log('form change', formData)
    // this.setState({
    //
    // })
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

  render() {
    const {isComplete} = this.state.formState
    return (
      <section className="page-form-demo">
        <p>page-form-demo</p>
        <TestForm
          onSubmit={this.handleSubmit}
          onFieldChange={this.handleFieldChange}
          onChange={this.handleChange}
          ref={(ref) => {
            this['form'] = ref
          } }
        >
          <div>
            <span>Name</span>
            <Field><Input
              type='text'
              name='realname'
              validate={/\d{9}/}
            /></Field>
            <span>Phone</span>
            <Field><Input
              type='text'
              name='phone'
              validate={/\d{9}/}
            /></Field>
          </div>
          <button type="submit" disabled={isComplete}>提交</button>
        </TestForm>

      </section>
    )
  }
}

export default FormDemo
