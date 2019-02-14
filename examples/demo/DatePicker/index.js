
import React, { Component } from 'react'
import { Cell } from '../../../src/Cell'
import DatePicker from '../../../lib/DatePicker'

const nowTimeStamp = Date.now()
const now = new Date(nowTimeStamp)
export default class DatePickerPage extends Component {
  state = {
    date: now,
    dpValue: null,
    customChildValue: null,
    visible: false
  }
  render () {
    return (
      <section>
        <div className='page--header'>
          <h1 className='page-title'>DatePicker</h1>
          <p className='page--desc'>选择器</p>
        </div>
        <Cell>
          <Cell.Body>
            <DatePicker
              mode='date'
              title='Select Date'
              extra='Optional'
              value={this.state.date}
              onChange={date => this.setState({ date })}
            >
              <Cell.Header>DatePicker1</Cell.Header>
            </DatePicker>
          </Cell.Body>
        </Cell>
      </section>
    )
  }
}
