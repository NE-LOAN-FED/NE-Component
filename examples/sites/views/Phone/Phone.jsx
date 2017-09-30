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
    const { protocol, host, pathname } = window.location
    // const path = 'demo.html/#/';
    const demoUrl = `${protocol}//${host}/${pathname}/demo.html#/${this.props.pathname}`

    return (
      <section className={phoneCls}>
        <div className='phone'>
          <iframe className='demo-page' src={demoUrl} />
          {this.props.children}
        </div>
      </section>
    )
  }
}

Phone.defaultProps = {
  pathname: ''
}