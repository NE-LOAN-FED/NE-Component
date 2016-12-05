import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import Icon from '../Icon'

export default class Input extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDelIcon: false
    }
  }

  static propTypes = {
    disabled: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onEmpty: PropTypes.func,
    emptyInput: PropTypes.func,
    formCellChange: PropTypes.func,
    shouldRsa: PropTypes.bool,
    required: PropTypes.bool,
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
    onChange: () => {},
    onFocus: () => {},
    onBlur: () => {},
    onEmpty: (name) => {},
    formCellChange: () => {}
  }

  shouldComponentUpdate(nextProps, nextState) {
    // BUG 为了提高性能，减少了渲染次数，但是可能会导致其他问题，等发现了再处理。
    return !(nextProps.value === this.props.value && this.state.showDelIcon === nextState.showDelIcon && nextProps.disabled === this.props.disabled)
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  changeHandler = (e) => {
    const showDelIcon = e.target.value.length > 0
    this.setState({
      showDelIcon
    })
  }
  focusHandler = (e) => {
    if (e.target.value.length > 0) {
      this.setState({
        showDelIcon: true
      })
    }
  }
  blurHandler = () => {
    this.setState({
      showDelIcon: false
    })
  }
  iconClickHandler = () => {
    this.setState({
      showDelIcon: false
    })
  }

  render() {
    const {showDelIcon} = this.state
    const {
      className, value, disabled, name,
      formCellChange,
      onChange, onFocus, onBlur, onEmpty,
      shouldRsa, validate, errorMsg, required, isError,
      emptyInput, ...others
    } = this.props
    const cls = classNames({
      ui_input: true,
      ui_input_disabled: disabled,
      [className]: className
    })

    return (
      // name 属性作为表单提交数据里面的 key, 用来区分每个不同的提交项，一个 Form 表单里面 name 不能重复
      <label className={cls}>
        <input disabled={disabled}
               name={name}
               value={value}
               onChange={(e) => {
                 this.changeHandler(e)
                 formCellChange(e)
                 onChange(e)
               }}
               onFocus={(e) => {
                 this.focusHandler(e)
                 onFocus(e)
               }}
               onBlur={(e) => {
                 // 延迟是为了当用户点击删除按钮的时候不会因为已经触发了 onBlur 事件而导致删除按钮不显示
                 e.persist()
                 this.timer = setTimeout(() => {
                   this.blurHandler()
                   onBlur(e)
                 }, 200)
               }}
               {...others}
        />
        {showDelIcon ? <Icon onClick={
          () => {
            emptyInput(name)
            onEmpty()
            this.iconClickHandler()
          }} type={'del'}/>
          : null}
      </label>
    )
  }
}
