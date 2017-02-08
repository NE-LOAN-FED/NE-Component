import React from 'react'
import classNames from 'classnames'
import Icon from '../Icon'

const PropTypes = React.PropTypes

export default class Select extends React.Component {
  constructor(props) {
    super(props)
    const {data} = this.props
    const mapValueToName = Select.createMapValueToName(data)
    this.state = {
      hasClicked: false,
      mapValueToName: mapValueToName
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
    onChange: () => {
    },
    formCellChange: PropTypes.func,
    required: true
  }

  static createMapValueToName(data) {
    const mapValueToName = {}
    data.forEach((v, k) => {
      mapValueToName[v.code] = data[k].name
    })
    return mapValueToName
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

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      const data = nextProps.data
      const mapValueToName = Select.createMapValueToName(data)
      this.setState({
        mapValueToName
      })
    }
  }

  clickHandler = () => {
    this.setState({
      hasClicked: true
    })
  }

  render() {
    const {className, name, data, formCellChange, onChange, value, children, ...others} = this.props
    const cls = classNames({
      NEUI_select: true,
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
            formCellChange(e.target)
            onChange(e)
          }}
          onClick={this.clickHandler}
        >
          <option disabled={!!value}>请选择</option>
          {data.length > 0 ? Select.renderData(data) : children}
        </select>
      </div>
    )
  }
}
