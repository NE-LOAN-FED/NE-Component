import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import Icon from '../Icon'

const noop = () => { }
// TODO 待完成,解决嵌套在 Form 组件后 checkbox 的选择问题
export default class _FieldCheckbox extends React.Component<any, any> {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.bool,
    shouldRsa: PropTypes.bool,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    handleFieldChange: PropTypes.func
  }
  static defaultProps = {
    required: true,
    disabled: false,
    onChange: noop,
    handleFieldChange: noop
  }
  handleChange = (e) => {
    this.props.onChange(e)
    this.setState({
      value: e.target.checked
    })
  }

  constructor (props) {
    super(props)
    this.state = {
      value: this.props.value || false
    }
  }

  get data () {
    const {value} = this.state
    const {name, shouldRsa} = this.props
    return {
      name,
      value,
      shouldRsa
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.state.value) {
      const nextValue = typeof nextProps.value === 'undefined' ? false : nextProps.value
      this.setState({
        value: nextValue
      })
    }
  }

  componentDidUpdate (preProps, preState) {
    const {handleFieldChange} = preProps
    if (preState.value !== this.state.value) {
      handleFieldChange(this.data)
      console.log(this.data)
    }
  }

  render () {
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
        <input type='checkbox'
               name={name}
               onChange={this.handleChange}
               checked={this.state.value}
               value={value}
               {...others}
        />
        {this.state.value ? <Icon type='tick' className='NEUI_checkbox_icon' /> : null}
        {children}
      </div>
    )
  }
}
