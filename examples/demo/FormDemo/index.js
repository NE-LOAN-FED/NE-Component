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
    console.log('form submit', isValidate, state, pureData)
  }
  handleChange = (formData) => {
    console.log('form change', formData)
  }
  handleFieldChange = (fieldData) => {
    console.log('field change', fieldData)
  }
  handleInputChange = () => {
    console.log('handleInputChange')
  }
  handleInputFocus = () => {
    console.log('handleInputFocus')
  }
  handleInputBlur = () => {
    console.log('handleInputBlur')
  }
  handleInputEmpty = () => {
    console.log('handleInputEmpty')
  }

  render() {
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
          </div>
          <button type="submit">sdfsdf</button>
        </TestForm>

      </section>
    )
  }
}

export default FormDemo
