/**
 * Created by yanming on 17/6/29.
 */
import React, { PropTypes } from 'react'
import {
  Flow,
  Button
} from '../../../src'

export default class FlowPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0
    }
  }

  handleNext = () => {
    let { current } = this.state
    this.setState({
      current: current === 3 ? 0 : ++current
    })
  }

  render() {
    const { current } = this.state
    return (
      <section className="page_collapse">
        <div className="page--header">
          <h1 className="page-title">Flow</h1>
          <p className="page--desc">流程进度</p>
        </div>
        <h3>Normal</h3>
        <Flow current={current}>
          <Flow.Item title="Finish" />
          <Flow.Item title="Progress" />
          <Flow.Item title="Wait" />
          <Flow.Item title="Wait" />
        </Flow>
        <h3>Vertical</h3>
        <Flow current={current} direction="vertical" style={{ 'height': '10rem' }}>
          <Flow.Item title="Finish" />
          <Flow.Item title="Progress" />
          <Flow.Item title="Wait" />
          <Flow.Item title="Wait" />
        </Flow>
        <Button onClick={this.handleNext}>Next</Button>
      </section>
    )
  }
}
