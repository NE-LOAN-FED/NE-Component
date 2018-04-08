/**
 * Created by kisnows on 2017/2/22.
 */

import React, { Component } from 'react'
import { Button } from '../../../src'

export default class ButtonPage extends Component {
  render () {
    return (
      <section>
        <div className='page--header'>
          <h1 className='page-title'>Button</h1>
          <p className='page--desc'>按钮</p>
        </div>
        <Button>Button Primary</Button>
        <Button role={'secondary'}>Button Secondary</Button>
        <Button disabled>Button Disabled</Button>
        <Button style={'rightAngle'}>Button Primary</Button>
        <Button style={'rightAngle'} role={'secondary'}>Button Secondary</Button>
        <Button style={'rightAngle'} disabled>Button Disabled</Button>
        <Button size={'small'}>Small Button</Button><Button size={'small'} disabled>Small Button</Button>
      </section>
    )
  }
}
