import React, {PropTypes} from 'react'
import Animate from 'rc-animate'
import ReactCssTransitionGroup from 'react-addons-css-transition-group'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ReactCssTransitionGroup
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
        transitionName={'page'}
        component={'div'}
      >
        {React.cloneElement(this.props.children, {
          key: this.props.location.pathname
        })}
      </ReactCssTransitionGroup>
    )
  }
}

export default App
