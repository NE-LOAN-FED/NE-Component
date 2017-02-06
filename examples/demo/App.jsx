import React, { PropTypes } from 'react'
import { Link } from 'react-router'

class App extends React.Component {

  render() {
    return (
      <div>
        <Link to="/">主页</Link>
        {this.props.children}
      </div>
    )
  }
}

export default App
