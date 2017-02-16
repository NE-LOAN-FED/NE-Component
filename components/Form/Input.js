import React from 'react'
import classNames from 'classnames'
import Icon from '../Icon'

const PropTypes = React.PropTypes

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
    onFocus: () => {
    },
    onBlur: () => {
    },
    onEmpty: (name) => {
    },
    formCellChange: () => {
    },
    parser: (data) => data,
    formatter: (data) => data
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   // BUG 为了提高性能，减少了渲染次数，但是可能会导致其他问题，等发现了再处理。
  //   return !(nextProps.value === this.props.value && this.state.showDelIcon === nextState.showDelIcon && nextProps.disabled === this.props.disabled)
  // }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  formCellChange = (t) => {
    const {formCellChange, parser} = this.props
    const target = {
      name: t.name,
      value: parser(t.value)
    }
    formCellChange(target)
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
      emptyInput, parser, formatter, ...others
    } = this.props
    const cls = classNames({
      NEUI_input: true,
      NEUI_input_disabled: disabled,
      [className]: className
    })
    const formatterValue = formatter(value)
    return (
      // name 属性作为表单提交数据里面的 key, 用来区分每个不同的提交项，一个 Form 表单里面 name 不能重复
      <label className={cls}>
        <input disabled={disabled}
               ref={(ref) => {
                 this.Input = ref
               }}
               name={name}
               value={formatterValue}
               onChange={(e) => {
                 this.changeHandler(e)
                 this.formCellChange(e.target)
                 onChange(e)
               }}
               onFocus={(e) => {
                 this.focusHandler(e)
                 onFocus(e)
               }}
               onBlur={(e) => {
                 // 因为要异步的使用 e, 所以需要保留 e 的引用
                 e.persist()
                 // 延迟是为了当用户点击删除按钮的时候不会因为已经触发了 onBlur 事件而导致删除按钮不显示
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
