/**
 * Created by kisnows on 2016/12/26.
 */
import * as PropTypes from 'prop-types'

import * as React from 'react'
import classNames from 'classnames'
import Icon from '../Icon'

// TODO 完成 Input 重构
// const env = process.env || process.env.NODE_ENV === 'development' ? 'DEBUG' : 'PROD'
const noop = () => { }

export default class _FieldInput extends React.Component<any, any> {
  static propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.any,
    type: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    disabled: PropTypes.bool,
    handleFieldChange: PropTypes.func,
    shouldRsa: PropTypes.bool,
    required: PropTypes.bool,
    validate: function (props, propName, componentName) {
      if (!((props[propName] instanceof RegExp) || (props[propName] instanceof Function))) {
        throw new Error('Invalid prop `' + propName + '` supplied to' +
          ' `' + componentName + '`. Must be a Function or RegExp.')
      }
    },
    errorMsg: PropTypes.string,
    isError: PropTypes.bool,
    formatter: PropTypes.func,
    parser: PropTypes.func
  }
  static defaultProps = {
    type: 'text',
    isError: false,
    shouldRsa: false,
    required: true,
    validate: () => true,
    errorMsg: '表单填写错误',
    disabled: false,
    onChange: noop,
    onFocus: noop,
    onBlur: noop,
    handleFieldChange: noop,
    formatter: data => data,
    parser: data => data
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
    const {parser} = this.props
    const value = e.target.value
    const formatterE = Object.assign({}, e, {
      target: {
        value: parser(value)
      }
    })
    this.props.onChange(formatterE)
    this.handleValidate(formatterE)
    this.setState({
      value: formatterE.target.value,
      showDelIcon: !!formatterE.target.value.length
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
    // 因为要异步的使用 e, 所以需要保留 e 的引用
    e.persist()
    const {onBlur} = this.props
    onBlur(e)
    // TODO 考虑做成配置项，来决定什么时候作校验
    this.handleValidate(e)

    // 延迟是为了当用户点击删除按钮的时候不会因为已经触发了 onBlur 事件而导致删除按钮不显示
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
  private timer: number

  constructor (props) {
    super(props)
    this.state = {
      showDelIcon: false,
      value: this.props.value || '',
      isError: this.props.isError || false
    }
  }

  get data () {
    const {value, isError} = this.state
    const {name, placeholder, errorMsg, required, shouldRsa} = this.props
    return {
      name,
      placeholder,
      value,
      isError,
      errorMsg,
      required,
      shouldRsa
    }
  }

  componentDidMount () {
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.state.value) {
      const nextValue = typeof nextProps.value === 'undefined' ? '' : nextProps.value
      this.setState({
        value: nextValue
      })
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return this.props.disabled !== nextProps.disabled ||
      this.state.value !== nextState.value ||
      this.state.showDelIcon !== nextState.showDelIcon ||
      this.state.isError !== nextState.isError
  }

  componentDidUpdate (preProps, preState) {
    const {handleFieldChange} = preProps
    if (this.state.value !== preState.value || this.state.isError !== preState.isError) {
      handleFieldChange(this.data)
    }
  }

  componentWillUnmount () {
    clearTimeout(this.timer)
  }

  render () {
    const {showDelIcon, value} = this.state
    const {className, disabled, name,placeholder, type, formatter} = this.props
    const formatterValue = formatter(value)
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
               placeholder={placeholder}
               value={formatterValue}
               type={type}
               onChange={this.handleChange}
               onFocus={this.handleFocus}
               onBlur={this.handleBlur}
        />
        {showDelIcon ? <Icon onClick={handleDelClick} type={'del'} /> : null}
      </label>
    )
  }
}
