import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import env from '../../utils/env'
import Icon from '../Icon'

export default class Select extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasClicked: false,
      mapValueToName: {}
    }
  }

  static propTypes = {
    name: PropTypes.string,
    data: PropTypes.array,
    onChange: PropTypes.func,
    formCellChange: PropTypes.func,
    required: PropTypes.bool
  }

  static defaultProps = {
    data: [],
    onChange: () => {},
    formCellChange: PropTypes.func,
    required: true
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      const data = nextProps.data
      const mapValueToName = {}
      data.forEach((v, k) => {
        mapValueToName[v.code] = data[k].name
      })
      this.setState({
        mapValueToName
      })
    }
  }

  componentDidMount() {
  }

  // 渲染 option，data 格式为 [{name:'name',code:'code'}]
  static renderData(data) {
    return data.map((item, i) => {
      return <option
        key={i}
        value={item.code}
      >
        {item.name}
      </option>
    })
  }

  clickHandler = () => {
    this.setState({
      hasClicked: true
    })
  }

  render() {
    const {className, name, data, formCellChange, onChange, value, children, ...others} = this.props
    const cls = classNames({
      ui_select: true,
      [className]: className
    })
    const label = value ? this.state.mapValueToName[value] : '请选择'
    return (
      <div className={cls} {...others}>
        <div><span>{label}</span><Icon type='arrow'/></div>
        <select
          name={name}
          value={value}
          onChange={(e) => {
            formCellChange(e)
            onChange(e)
          }}
          onClick={this.clickHandler}
        >
          {env.isios ? <option disabled={true}>请选择</option> : null}
          {data.length > 0 ? Select.renderData(data) : children}
        </select>
      </div>
    )
  }
}
