/**
 * Created by kisnows on 2016/12/26.
 */
import React from 'react'
import Form from '../../../components/Form/TestForm'
import Input from '../../../components/Form/TestInput'
import createFormItem from '../../../components/Form/createFormItem'


class FormDemo extends React.Component {
  componentDidMount(){

  }
  handleSubmit = () => {

  }
  render() {
    return (
      <section className="page-form-demo">
        <p>page-form-demo</p>
        <Form ref={(ref)=>{this.Form = ref}}
              onSubmit={this.handleSubmit}
        >

        </Form>
      </section>
    )
  }
}

export default FormDemo
