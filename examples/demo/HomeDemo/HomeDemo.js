/**
 * Created by kisnows on 2016/9/13.
 */
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import {Form, Input} from '../../../components'

class Home extends React.Component {

  render() {
    return (
      <section className='page_home'>
        <Link to="/alert">Alert</Link>
        <Link to="/form">Form</Link>
        <Form>
          <span>你好</span>
          <Input/>
        </Form>
      </section>
    )
  }
}
export default Home
