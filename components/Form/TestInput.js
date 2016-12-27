/**
 * Created by kisnows on 2016/12/26.
 */
import React, {PropTypes} from 'react'
import classnames from 'classnames'
import Icon from '../Icon'

export default class TestInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDelIcon: false,
      value: this.props.value || '',
      isError: this.props.isError || false
    }
  }

  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onEmpty: PropTypes.func,
    disabled: PropTypes.bool,
    formCellChange: PropTypes.func,
    shouldRsa: PropTypes.bool,
    required: PropTypes.bool,
    parser: PropTypes.func,
    formatter: PropTypes.func,
    validate: function (props, propName, componentName) {
      if (!((props[propName] instanceof RegExp) || (props[propName] instanceof Function))) {
        throw new Error('Invalid prop `' + propName + '` supplied to' +
          ' `' + componentName + '`. Must be a Function or RegExp.')
      }
    },
    errorMsg: PropTypes.string,
    isError: PropTypes.bool
  }

  static defaultProps = {
    isError: false,
    shouldRsa: false,
    required: true,
    validate: () => true,
    errorMsg: '表单填写错误',
    disabled: false,
    onChange: () => {
    },
    handleFieldChange: () => {
    },
    onFocus: () => {
    },
    onBlur: () => {
    },
    handleFieldBlur: () => {
    },
    onEmpty: (name) => {
    },
    formCellChange: () => {
    },
    parser: (data) => data,
    formatter: (data) => data
  }

  componentDidMount() {
  }

  shouldComponentUpdate(nextProps, nextState) {

    return this.props.disabled !== nextProps.disabled ||
      this.state.value !== nextState.value ||
      this.state.showDelIcon !== nextState.showDelIcon;

  }

  componentWillUnmount() {
  }

  get data() {
    const {value, isError} = this.state
    const {name, errorMsg, required, shouldRsa} = this.props
    return {
      name,
      value,
      isError,
      errorMsg,
      required,
      shouldRsa
    }
  }

  handleValidate = (e) => {
    const value = e.target.value
    const {validate} = this.props
    let isError = false
    // TODO 考虑把校验方法提取出来，作为 props 传给 Input
    if (validate instanceof RegExp) {
      isError = !(value && validate.test(value))
    } else if (validate instanceof Function) {
      if (!value) {
        return isError = false
      }
      const validateResult = validate(value)
      if (validateResult.then instanceof Function) {
        validateResult.then(result => this.setState({
            isError: result
          }
        ))
      } else {
        isError = !validateResult
      }
    } else {
      isError = !value
    }
    this.setState({
      isError
    })
  }

  handleChange = (e) => {
    const {onChange, handleFieldChange} = this.props
    handleFieldChange(this.data)
    onChange(e)
    this.setState({
      value: e.target.value
    })
  }

  handleFocus = (e) => {
    const {onFocus} = this.props
    onFocus(e)
    if (e.target.value.length > 0) {
      this.setState({
        showDelIcon: true
      })
    }
  }

  handleBlur = (e) => {
    // e.persist()
    const {name, onBlur, handleFieldBlur} = this.props
    handleFieldBlur(name)
    onBlur(e)
    // TODO 考虑做成配置项，来决定什么时候作校验
    this.handleValidate(e)
    this.setState({
      showDelIcon: false
    })
  }

  handleEmptied = () => {
    const e = {
      target: {
        value: ''
      }
    }
    this.handleChange(e)
  }

  handleDelClick = () => {
    this.handleEmptied()
    this.setState({
      showDelIcon: false
    })
  }

  render() {
    const {showDelIcon, value} = this.state
    const {className, disabled, name} = this.props
    const prefix = 'NEUI'
    const cls = classnames({
      [`${prefix}_input`]: true,
      [`${prefix}_input_disabled`]: disabled,
      [className]: className
    })
    const DelIcon = <Icon onClick={this.handleDelClick} type={'del'}/>
    return (
      <label className={cls}>
        <input name={name}
               value={value}
               onChange={this.handleChange}
               onFocus={this.handleFocus}
               onBlur={this.handleBlur}
        />
        {showDelIcon ? <DelIcon/> : null}
      </label>
    )
  }
}
