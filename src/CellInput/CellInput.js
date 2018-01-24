import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

const NUMBER_REGEXP = /^\d+$/

export default class CellInput extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    value: PropTypes.string || PropTypes.number,
    name: PropTypes.string,
    maxLength: PropTypes.number,
    type: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onConfirm: PropTypes.func,
    onError: PropTypes.func,
    autoFocus: PropTypes.bool,
    errorMsg: PropTypes.string,
    validate: function (props, propName, componentName) {
      if (!((props[propName] instanceof RegExp) || (props[propName] instanceof Function))) {
        throw new Error('Invalid prop `' + propName + '` supplied to' +
          ' `' + componentName + '`. Must be a Function or RegExp.')
      }
    }
  }

  static defaultProps = {
    prefixCls: 'NEUI',
    value: '',
    type: 'number',
    maxLength: 6,
    autoFocus: true,
    onChange: () => { },
    onFocus: () => { },
    onConfirm: () => { },
    onError: () => { },
    errorMsg: '输入信息有误',
    validate: () => true
  }

  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.state = {
      value: props.value,
      activeIndex: -1
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setValueState(nextProps.value)
      this.setCellsActive(nextProps.value)
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextState.value !== this.state.value || nextState.activeIndex !== this.state.activeIndex) {
      return true
    }
    if (nextProps.maxLength !== this.props.maxLength || nextProps.type !== this.props.type) {
      return true
    }
    return false
  }

  componentDidUpdate () {
    this.setCellsActive(this.state.value)
  }

  componentDidMount () {
    if (this.props.autoFocus) {
      this.setFocus()
    }
  }

  isValidate (value) {
    const {type, maxLength, validate} = this.props
    if (value.length > maxLength) {
      return false
    }
    if (type === 'number') {
      return NUMBER_REGEXP.test(value)
    }
    if (validate instanceof RegExp) {
      return validate.test(value)
    } else {
      return validate(value)
    }
  }

  isCompletion (value = this.state.value) {
    if (this.isValidate(value) && (value.length === this.props.maxLength)) {
      return true
    }
    return false
  }

  setCellsActive (value = this.state.value) {
    const {maxLength} = this.props
    const index = value.length
    if (index < maxLength && index > 0) {
      this.setState({
        activeIndex: index
      })
    } else {
      this.setState({
        activeIndex: index
      })
    }
  }

  setValueState (value) {
    const {maxLength, onConfirm, onChange, onError, errorMsg} = this.props
    const prevValue = this.state.value
    if (this.isValidate(value) || value === '') {
      this.setState({
        value
      }, () => {
        onChange(value)
        if (this.isCompletion(value)) {
          this.props.onConfirm(this.state.value)
        }
      })
    } else {
      this.setState({
        value: prevValue
      }, () => {
        onError(errorMsg)
      })
    }
  }

  setFocus () {
    this.Input.focus()
    this.setCellsActive(this.state.value)
  }

  clearValue () {
    this.setState({
      value: ''
    })
  }

  onChange (e) {
    const value = e.target.value
    this.setValueState(value)
  }

  onFocus (e) {
    this.props.onFocus(e)
  }

  createCellsEle () {
    const {value, activeIndex} = this.state
    const {prefixCls, maxLength} = this.props
    const cellsEle = []
    for (let i = 0; i < maxLength; i++) {
      let cellProps = {
        prefixCls,
        value: value.substr(i, 1),
        active: i === activeIndex
      }
      cellsEle[i] = <Cell key={i} {...cellProps} />
    }
    return cellsEle
  }

  render () {
    const {
      prefixCls,
      value,
      type,
      name,
      maxLength,
      className, disabled, required,
      onChange, onFocus, validate, errorMsg,
      ...other
    } = this.props
    const classnames = classNames({
      [`${prefixCls}_cell_input`]: true,
      [`${prefixCls}_cell_input_disabled`]: disabled,
      [className]: className
    })

    const cells = this.createCellsEle()
    return (
      <label className={classnames}>
        <input disabled={disabled}
          name={name}
          value={this.state.value}
          ref={(ref) => { this.Input = ref }}
          onChange={this.onChange}
          onFocus={this.onFocus}
          {...other}
        />
        <div className={`${prefixCls}_cell_input_list`}>
          {cells}
        </div>
      </label>
    )
  }
}

const Cell = (props) => {
  const {prefixCls, value, active} = props
  const classnames = classNames({
    [`${prefixCls}_cell_input_item`]: true,
    active
  })
  return (
    <span className={classnames}>{props.value}</span>
  )
}
