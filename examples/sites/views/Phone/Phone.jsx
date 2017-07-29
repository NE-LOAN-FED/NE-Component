import React from 'react'
import classNames from 'classnames'
export default class Phone extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const phoneCls = classNames({
      'col-4': true,
      'demo': true
    })
    return (
      <section className={phoneCls}>
        <div className='phone'>
          <iframe className='demo-page'>
          </iframe>
          {this.props.children}
        </div>
      </section>
    )
  }
}