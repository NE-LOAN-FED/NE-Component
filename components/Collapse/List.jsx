import React, {Component, PropTypes} from 'react'
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
      collapse: this.props.collapse || true
    }
  }

  static propTypes = {
    prefixCls: PropTypes.string,
    title: PropTypes.node,
    content: PropTypes.node,
    collapse: PropTypes.bool,
    onChange: PropTypes.func,
    id: PropTypes.number
  }

  static defaultProps = {
    prefixCls: 'NEUI',
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.collapse && nextProps.collapse !== this.state.collapse) {
      this.setState({
        collapse: nextProps.collapse
      })
    }
  }

  handleClick = () => {
    this.toggle()
  }

  toggle = (collapse) => {
    const id = this.props.id
    const nextCollapse = collapse ? collapse : !this.state.collapse
    this.props.onChange(id, nextCollapse)
    this.setState({
      collapse: nextCollapse
    })
  }

  render() {
    const {title, content, className, prefixCls, onClick} = this.props
    const {collapse} = this.state
    const cls = classNames({
      [`${prefixCls}_collapse`]: true,
      [className]: className
    })

    function FirstChild(props) {
      const childrenArray = React.Children.toArray(props.children)
      return childrenArray[0] || null
    }

    return (
      <div className={cls} onClick={onClick}>
        <Cells onClick={this.handleClick}>
          <Cell>
            <CellBody>{title}</CellBody>
            <CellFooter>
              <Icon type='arrow'
                    className={classNames({
                      list_icon: true,
                      collapse: collapse
                    })}/>
            </CellFooter>
          </Cell>
        </Cells>
        <Animate animation={Animation} component={FirstChild}>
          {!collapse ?
            <div className="list_content_wrap">
              <p className="list_content" key={this}>{content}</p>
            </div> : null}
        </Animate>
      </div>
    )
  }
}
