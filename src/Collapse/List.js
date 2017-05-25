import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import Animation from '../_utils/animation'
import Animate from 'rc-animate'
import {
  Cells,
  Cell,
  CellBody,
  CellFooter,
  Icon
} from '../index'

export default class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCollapse: this.props.data.isCollapse || true
    }
  }

  static propTypes = {
    prefixCls: PropTypes.string,
    data: PropTypes.shape({
      title: PropTypes.node,
      content: PropTypes.node,
      isCollapse: PropTypes.bool
    }),
    onChange: PropTypes.func,
    id: PropTypes.number
  }

  static defaultProps = {
    prefixCls: 'NEUI',
    data: {}
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.isCollapse && nextProps.data.isCollapse !== this.state.isCollapse) {
      this.setState({
        isCollapse: nextProps.data.isCollapse
      })
    }
  }

  handleClick = () => {
    this.toggle()
  }

  toggle = (collapse) => {
    const id = this.props.id
    const nextCollapse = collapse || !this.state.isCollapse
    this.props.onChange(id, nextCollapse)
    this.setState({
      isCollapse: nextCollapse
    })
  }

  render() {
    const { data, className, prefixCls, onClick } = this.props
    const { title, content } = data
    const { isCollapse } = this.state
    const cls = classNames({
      [`${prefixCls}_collapse`]: true,
      is_active: !isCollapse,
      [className]: className
    })

    function FirstChild(props) {
      const childrenArray = React.Children.toArray(props.children)
      return childrenArray[0] || null
    }

    return (
      <div className={cls} onClick={onClick}>
        <Cell onClick={this.handleClick}>
          <CellBody>{title}</CellBody>
          <CellFooter>
            <Icon type='arrow'
              className={classNames({
                collapse: isCollapse,
                list_icon: true
              })} />
          </CellFooter>
        </Cell>
        <Animate animation={Animation} component={FirstChild}>
          {!isCollapse
            ? <div className='list_content_wrap'>
              <p className='list_content' key={this}>{content}</p>
            </div> : null}
        </Animate>
      </div>
    )
  }
}
