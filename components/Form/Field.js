/**
 * Created by kisnows on 2016/12/27.
 */
import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import create from './createFormItem'

export default class Field extends Component {
  constructor(props) {
    super(props)
  }

  injectMethod() {
    const {children, handleFieldChange, handleFieldBlur} = this.props
    return React.Children.map(children, (el, i) => {
      if (!el) return null
      return create({
        FieldChange: handleFieldChange,
        FieldBlur: handleFieldBlur,
        other: {key: i}
      })(el)
    })
  }

  render() {
    return (
      <div>{this.injectMethod()}</div>
    )
  }
}
