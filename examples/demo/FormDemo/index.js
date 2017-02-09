/**
 * Created by kisnows on 2016/12/26.
 */
import React from 'react'
import TestForm from '../../../components/Form/TestForm'
import Input from '../../../components/Form/TestInput'
import Button from '../../../components/Button'
import Logger from '../../../utils/log'


const logger = new Logger('DEBUG', 'FormDemo')

class FormDemo extends React.Component {
  constructor() {
    super()
    this.state = {
      showInput: true,
      formData: {}
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

  render() {
    const {showInput} = this.state
    const {isComplete} = this.state.formData
    logger.info('render', this.state.formData)
    console.log(isComplete)
    return (
      <section className="page-form-demo">
        <p>page-form-demo</p>
        <TestForm
          onSubmit={this.handleSubmit}
          onFieldChange={this.handleFieldChange}
          onChange={this.handleChange}
          ref={(ref) => {
            this['$Form'] = ref
          } }
        >
          <div>
            <span>smile</span>
            <Input name={'smile'}/>
          </div>
          <div>
            <span>realname</span>
            <Input
              type='text'
              name='realname'
              validate={/^\d{9}$/}
            />
          </div>
          <div>
            <span>Phone</span>
            <Input
              type='text'
              name='phone'
              validate={/^\d{9}$/}
            />
          </div>
          {
            showInput ? <Input name={'your'}/> : null
          }
          <Button type="submit" disabled={!isComplete}>提交</Button>
        </TestForm>
      </section>
    )
  }
}

export default FormDemo
