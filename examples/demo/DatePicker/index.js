
import React, { Component } from 'react'
import { Cell } from '../../../src/Cell'
import { Form, Input } from '../../../src/Form'
import DatePicker from '../../../src/DatePicker'

console.log(DatePicker)
const nowTimeStamp = Date.now()
const now = new Date(nowTimeStamp)
class Test extends Component {
  render() {
    return (
      <div>
        {this.props.extra}
      </div>
    )
  }
}
export default class DatePickerPage extends Component {
  state = {
    date: null,
    dpValue: null,
    customChildValue: null,
    visible: false,
    name: {
      value: 'xxx'
    }
  }
  render () {
    return (
      <section>
        <div className='page--header'>
          <h1 className='page-title'>DatePicker</h1>
          <p className='page--desc'>选择器</p>
        </div>
        <Form>
          <Cell>
            <Cell.Header>Name</Cell.Header>
            <Input type='text'
              name='name'
              errorMsg={'xxxx'}
              value={this.state.name.value}
              data-index='1'
            />
          </Cell>
          <Cell>
            <Cell.Body>
              <Cell.Header>Name</Cell.Header>

              <DatePicker
                mode='date'
                title='Select Date'
                extra='click to choose'
                value={this.state.date}
                onChange={date => this.setState({ date })}
              >
                <Cell.Header>click to choose</Cell.Header>
              </DatePicker>
            </Cell.Body>
          </Cell>
        </Form>
        <DatePicker
          mode='date'
          title='请选择2'
          extra='click to choose'
          value={this.state.date}
          onChange={date => this.setState({ date })}
        >

          <button>click to choose</button>
        </DatePicker>
      </section>
    )
  }
}
