/**
 * Created by kisnows on 2016/9/13.
 */
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

class Home extends React.Component {

  render() {
    return (
      <section className='page_home'>
        <Link to="/alert">Alert</Link>
        <Link to="/form">Form</Link>
      </section>
    )
  }
}
export default Home
