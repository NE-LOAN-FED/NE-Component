import React from 'react'
import classNames from 'classnames'
import Icon from '../Icon'

const PropTypes = React.PropTypes
// TODO 待完成,解决嵌套在 Form 组件后 checkbox 的选择问题
export default class _FieldCheckbox extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      checked: this.props.checked || false
    }
  }

  static propTypes = {
    name: PropTypes.string,
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
    if (nextProps.checked && nextProps.checked !== this.state.checked) {
      this.setState({
        checked: nextProps.checked
      })
    }
  }

  componentDidUpdate(preProps, preState) {
    const {handleFieldChange} = preProps
    if (preState.checked !== this.state.checked) {
      handleFieldChange(this.data)
      console.log(this.data)
    }
  }

  get data() {
    const {checked} = this.state
    const {name} = this.props
    return {
      name,
      value: checked
    }
  }

  handleChange = (e) => {
    this.props.onChange(e)
    this.setState({
      checked: e.target.checked
    })
  }

  render() {
    const {
      className, name, value, children, onChange, handleFieldChange, ...others
    } = this.props
    const {checked} = this.state
    const cls = classNames({
      NEUI_checkbox: true,
      NEUI_checkbox_checked: checked,
      [className]: className
    })
    return (
      <div className={cls}>
        <input type="checkbox"
               name={name}
               onChange={this.handleChange}
               checked={checked}
               value={value}
               {...others}
        />
        {checked ? <Icon type="tick" className="NEUI_checkbox_icon"/> : null}
        {children}
      </div>
    )
  }
}
