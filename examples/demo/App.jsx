import React, { PropTypes } from 'react'
import Animate from 'rc-animate'

class App extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        {React.cloneElement(this.props.children, {
          key: this.props.location.pathname
        })}
      </div>
    )
  }
}

export default App
