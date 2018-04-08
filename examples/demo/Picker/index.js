/**
 * Created by kisnows on 2017/2/22.
 */
import React, { Component } from 'react'
import { Cell, Picker} from '../../../src'

export default class PickerPage extends Component {
  render () {
    return (
      <section>
        <div className='page--header'>
          <h1 className='page-title'>Picker</h1>
          <p className='page--desc'>选择器</p>
        </div>
        <Cell>
          <Cell.Header>DatePicker</Cell.Header>
          <Cell.Body>
            <Picker/>
          </Cell.Body>
        </Cell>
      </section>
    )
  }
}
