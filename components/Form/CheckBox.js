import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import Icon from '../Icon'

// TODO 待完成,解决嵌套在 Form 组件后 checkbox 的选择问题
export default class Checkbox extends Component {

  static propTypes = {
    name: PropTypes.string,
    shouldRsa: PropTypes.bool,
    isError: PropTypes.bool,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    onChange: PropTypes.func,
    formCellChange: PropTypes.func
  }

  static defaultProps = {
    shouldRsa: false,
    isError: false,
    disabled: false,
    required: true,
    onChange: () => {},
    formCellChange: () => {}
  }

  render() {
    const {
      className, checked, name,
      formCellChange, onChange,
      value,
      shouldRsa, validate, errorMsg, required, isError,
      ...others
    } = this.props
    const cls = classNames({
      NEUI_checkbox: true,
      NEUI_checkbox_checked: checked,
      [className]: className
    })
    return (
      <label className={cls} {...others}>
        <input type="checkbox"
               name={name}
               onChange={(e) => {
                 console.log(e.target.checked, e.target.value)
                 formCellChange(e.target, 'checkbox')
                 onChange(e)
               }}
               checked={checked}
               value={value}
        />
        {checked ? <Icon type="tick" className="NEUI_checkbox_icon"/> : null}
      </label>
    )
  }
}
