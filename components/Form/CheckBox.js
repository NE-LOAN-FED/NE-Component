import React from 'react'
import classNames from 'classnames'
import Icon from '../Icon'

const PropTypes = React.PropTypes
// TODO 待完成,解决嵌套在 Form 组件后 checkbox 的选择问题
export default class _FieldCheckbox extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value || false
    }
  }

  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.bool,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    handleFieldChange: PropTypes.func
  }

  static defaultProps = {
    required: true,
    disabled: false,
    onChange: () => {
    },
    handleFieldChange: () => {
    },
  }

  componentWillReceiveProps(nextProps) {
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
      console.log(this.data)
    }
  }

  get data() {
    const {value} = this.state
    const {name} = this.props
    return {
      name,
      value: value
    }
  }

  handleChange = (e) => {
    this.props.onChange(e)
    this.setState({
      value: e.target.checked
    })
  }

  render() {
    const {
      className, name, value, children, onChange, handleFieldChange, ...others
    } = this.props
    const cls = classNames({
      NEUI_checkbox: true,
      NEUI_checkbox_checked: this.state.value,
      [className]: className
    })
    return (
      <div className={cls}>
        <input type="checkbox"
               name={name}
               onChange={this.handleChange}
               checked={this.state.value}
               value={value}
               {...others}
        />
        {this.state.value ? <Icon type="tick" className="NEUI_checkbox_icon"/> : null}
        {children}
      </div>
    )
  }
}
