/**
 * Created by kisnows on 2017/2/22.
 */
import PropTypes from 'prop-types'

import React, { Component } from 'react'
import { Link } from 'react-router'
import { Cells, Cell, Icon } from '../../../src'

export default class IconPage extends Component {
  render () {
    const iconTypeList = [
      'tip',
      'del',
      'arrow',
      'tick',
      'loading',
      'wait',
      'close',
      'warning',
      'success'
    ]
    const Icons = iconTypeList.map((v, k) => {
      return (
        <Cell key={k}>
          <Cell.Header>{v}</Cell.Header> <Cell.Body><Icon type={v} /></Cell.Body>
        </Cell>
      )
    })
    return (
      <section>
        <div className='page--header'>
          <h1 className='page-title'>Icon</h1>
          <p className='page--desc'>固定的常用字体图标</p>
        </div>
        <Cells>
          {Icons}
        </Cells>
      </section>
    )
  }
}
