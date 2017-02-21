import React from 'react'
import classNames from 'classnames'
import Icon from '../Icon'

const PropTypes = React.PropTypes

export default class _FieldSelect extends React.Component {
  constructor(props) {
    super(props)
    const {data} = this.props
    const mapValueToName = this.createMapValueToName(data)
    this.state = {
      value: this.props.value || '',
      mapValueToName: mapValueToName
    }
  }

  static propTypes = {
    name: PropTypes.string,
    data: PropTypes.array,
    required: PropTypes.bool,
    shouldRsa: PropTypes.bool,
    onChange: PropTypes.func,
    handleFieldChange: PropTypes.func
  }

  static defaultProps = {
    data: [],
    required: true,
    shouldRsa: false,
    onChange: () => {
    },
    handleFieldChange: () => {
    }
  }

  createMapValueToName(data) {
    const mapValueToName = {}
    data.forEach((v, k) => {
      mapValueToName[v.value] = data[k].name
    })
    return mapValueToName
  }

  // 渲染 option，data 格式为 [{name:'name',value:'value',disabled: false}]
  renderData(data) {
    return data.map((item, i) => {
      return <option
        key={i}
        value={item.value}
        disabled={item.disabled}
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
      const mapValueToName = this.createMapValueToName(data)
      this.setState({
        mapValueToName
      })
    }
    if (nextProps.value && nextProps.value !== this.state.value) {
      this.setState({
        value: nextProps.value
      })
    }
  }

  componentDidUpdate(preProps, preState) {
    const {handleFieldChange} = preProps
    if (preState.value !== this.state.value) {
      handleFieldChange(this.data)
    }
  }

  get data() {
    const {value} = this.state
    const {name, required, shouldRsa} = this.props
    return {
      name,
      value,
      required,
      shouldRsa
    }
  }

  handleChange = (e) => {
    this.props.onChange(e)
    if (e.target.value !== this.state.value) {
      this.setState({
        value: e.target.value
      })
    }
  }

  render() {
    const {className, name, data, children} = this.props
    const {value} = this.state
    const cls = classNames({
      NEUI_select: true,
      [className]: className
    })
    const label = value ? this.state.mapValueToName[value] : '请选择'
    return (
      <div className={cls}>
        <div><span>{label}</span><Icon type='arrow'/></div>
        <select
          name={name}
          value={value}
          onChange={this.handleChange}
        >
          <option disabled={!!value}>请选择</option>
          {data.length > 0 ? this.renderData(data) : children}
        </select>
      </div>
    )
  }
}
