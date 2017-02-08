/**
 * Created by kisnows on 2016/12/26.
 */
import React, {PropTypes} from 'react'
import classNames from 'classnames'
import Icon from '../Icon'
import Logger from '../../utils/log.js'

const env = process.env || process.env.NODE_ENV === 'development' ? 'DEBUG' : 'PROD'
const logger = new Logger(env, 'TestInput')

export default class TestInput extends React.Component {
  constructor(props) {
    super(props)
    this.timer = null
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
    onFieldChange: PropTypes.func,
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
    // onFieldChange: () => {
    // },
    onFocus: () => {
    },
    onBlur: () => {
    },
    onFieldBlur: () => {
    },
    onEmpty: (name) => {
    },
    parser: (data) => data,
    formatter: (data) => data
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value && nextProps.value !== this.state.value) {
      this.setState({
        value: nextProps.value
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.disabled !== nextProps.disabled ||
      this.state.value !== nextState.value ||
      this.state.showDelIcon !== nextState.showDelIcon ||
      this.state.isError !== nextState.isError
  }

  componentWillUpdate(nextProps, nextState) {

  }

  componentDidUpdate(preProps, preState) {
    const {onFieldChange} = preProps
    logger.log('DidUpdate', 'isError now', this.state.isError, 'isError pre', preState.isError)
    if (this.state.value !== preState.value || this.state.isError !== preState.isError) {
      onFieldChange(this.data)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
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
        return (isError = false)
      }
      const validateResult = validate(value)
      if (validateResult.then instanceof Function) {
        validateResult.then(result => this.setState({
          isError: result
        }))
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
    const {onChange} = this.props
    onChange(e)
    this.setState({
      value: e.target.value,
      showDelIcon: !!e.target.value.length
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
    e.persist()
    const {name, onBlur, onFieldBlur} = this.props
    onFieldBlur(name)
    onBlur(e)
    // TODO 考虑做成配置项，来决定什么时候作校验
    this.handleValidate(e)
    this.timer = setTimeout(() => {
      this.setState({
        showDelIcon: false
      })
    }, 300)
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
    logger.log('render')
    const {showDelIcon, value} = this.state
    const {className, disabled, name} = this.props
    const prefix = 'NEUI'
    const cls = classNames({
      [`${prefix}_input`]: true,
      [`${prefix}_input_disabled`]: disabled,
      [className]: className
    })
    const handleDelClick = this.handleDelClick
    return (
      <label className={cls}>
        <input name={name}
               value={value}
               onChange={this.handleChange}
               onFocus={this.handleFocus}
               onBlur={this.handleBlur}
        />
        {showDelIcon ? <Icon onClick={handleDelClick} type={'del'}/> : null}
      </label>
    )
  }
}
