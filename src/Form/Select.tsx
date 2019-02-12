import * as PropTypes from 'prop-types'
import * as React from 'react'
import classNames from 'classnames'
import Icon from '../Icon'

const noop = () => { }

/**
 * 生成一个 Value 到 Name 的 Map 对象
 * @param data Object
 * @returns {{}}
 */
function mapValueToName (data) {
  const mapValueToName = {}
  data.forEach((v, k) => {
    mapValueToName[v.value] = data[k].name
  })
  return mapValueToName
}

// 渲染 option，data 格式为 [{name:'name',value:'value',disabled: false}]
function renderData (data) {
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

export default class _FieldSelect extends React.Component<any, any> {
  static propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    placeholderName: PropTypes.string,
    data: PropTypes.array,
    required: PropTypes.bool,
    shouldRsa: PropTypes.bool,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    handleFieldChange: PropTypes.func,
    value: PropTypes.any
  }
  static defaultProps = {
    data: [],
    required: true,
    shouldRsa: false,
    onChange: noop,
    handleFieldChange: noop
  }
  handleChange = (e) => {
    this.props.onChange(e)
    if (e.target.value !== this.state.value) {
      this.setState({
        value: e.target.value
      })
    }
  }

  constructor (props) {
    super(props)
    const {data} = this.props
    const valueNameMap = mapValueToName(data)
    this.state = {
      value: this.props.value || '',
      valueNameMap: valueNameMap
    }
  }

  get data () {
    const {value} = this.state
    const {name, required, shouldRsa, placeholder, placeholderName} = this.props
    return {
      name,
      placeholder,
      placeholderName,
      value,
      required,
      shouldRsa
    }
  }

  componentWillMount () {

  }

  componentDidMount () {

  }

  componentWillReceiveProps (nextProps) {
    if (this.props.data !== nextProps.data) {
      const data = nextProps.data
      const valueNameMap = mapValueToName(data)
      this.setState({
        valueNameMap
      })
    }
    if (nextProps.value !== this.state.value) {
      const nextValue = typeof nextProps.value === 'undefined' ? '' : nextProps.value
      this.setState({
        value: nextValue
      })
    }
  }

  componentDidUpdate (preProps, preState) {
    const {handleFieldChange} = preProps
    if (preState.value !== this.state.value) {
      handleFieldChange(this.data)
    }
  }

  render () {
    const {className, name,placeholder, placeholderName, data, disabled, children} = this.props
    const {value} = this.state
    const cls = classNames({
      NEUI_select: true,
      [className]: className
    })
    const label = value ? this.state.valueNameMap[value] : (placeholder ||'请选择')
    return (
      <div className={cls}>
        <div><span className={placeholderName}>{label}</span><Icon type='arrow' /></div>
        <select
          name={name}
          value={value}
          onChange={this.handleChange}
          disabled={disabled}
        >
          <option disabled={!!value}>{placeholder || '请选择'}</option>
          {data.length > 0 ? renderData(data) : children}
        </select>
      </div>
    )
  }
}
