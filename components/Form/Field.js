/**
 * Created by kisnows on 2016/12/27.
 */
import React from 'react'
import classNames from 'classnames'
import create from './createFormField'

export default class Field extends React.Component {
  componentDidMount() {
    // this.injectMethod()
  }
  injectMethod = () => {
    const {children, handleFieldChange, handleFieldBlur} = this.props
    return React.Children.map(children, (el, i) => {
      if (!el) return null
      return React.cloneElement(el, {
        onFieldChange: handleFieldChange,
        onFieldBlur: handleFieldBlur,
        key: i
      })
    })
  }

  render() {
    return (
      <div>{this.injectMethod()}</div>
    )
  }
}
