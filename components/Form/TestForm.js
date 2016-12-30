/**
 * Created by kisnows on 2016/12/26.
 */
import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import Field from './Field'
import {isFormComplete, formPure, isFromValidate} from './FormUtils'
import create from './createFormItem.js'

export default class Form extends React.Component {
  constructor(props) {
    super(props)
    const {isComplete, isValidate, data, errorMsgList} = this.props
    this.state = {
      isComplete: isComplete || false,
      isValidate: isValidate || false,
      data: data || {},
      errorMsgList: errorMsgList || []
    }
    this.count = 1
  }

  static propTypes = {
    onFieldChange: PropTypes.func,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    isComplete: PropTypes.bool,
    isValidate: PropTypes.bool,
    data: PropTypes.any,
    errorMsgList: PropTypes.array
  }

  static defaultProps = {}

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.children !== this.props.children) {
      // this.initFormField()
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.state.isComplete !== nextState.isComplete
  //     || this.state.isValidate !== nextState.isValidate
  //     || this.state.errorMsgList.length !== nextState.errorMsgList.length
  // }

  componentWillUpdate(nextProps, nextState) {

  }

  componentDidUpdate(preProps, preState) {
    this.props.onChange(this.data)
    console.log(this.state.data.realname.isError)
  }

  componentWillUnmount() {
  }

  get data() {
    return this.state
  }

  initFormField = (children) => {
    // TODO 优化性能，当 Field 已经有 key 的时候，就不重新 clone 了
    console.log(this.count)
    this.count++
    const handleFieldChange = this.handleFieldChange
    return React.Children.map(children, (el, i) => {
      if (!el) return null
      if (el.type === Field) {
        return React.cloneElement(el, {
          key: i,
          handleFieldChange
        })
      } else {
        if (el.props && el.props.children instanceof Array) {
          const children = this.initFormField(el.props.children)
          return React.cloneElement(el, {
            key: i,
            children
          })
        } else {
          return el
        }
      }
    })
  }

  handleFieldChange = (fieldData) => {
    let state = {
      ...this.state,
      ...this.state.data
    }
    let name = fieldData.name
    if (state.data[name]) {
      state.data[name] = {
        ...state.data[name],
        ...fieldData
      }
    } else {
      state.data[name] = fieldData
    }
    // TODO 重写 isFormComplete
    state.isComplete = isFormComplete(state.data)
    this.setState({
      ...state
    })
    this.props.onFieldChange(fieldData)
  }
  handleFormSubmit = (e) => {
    e.preventDefault()
    const {onSubmit} = this.props
    let state = {
      ...this.state,
      ...this.state.data
    }
    state = isFromValidate(state)
    const isValidate = state.isValidate
    if (isValidate) {
      formPure(state.data)
        .then(pureData => onSubmit(isValidate, state, pureData))
    } else {
      onSubmit(isValidate, state, null)
    }
    this.setState({
      ...state
    })
  }

  /**
   * 获得当前最新的处理并加密后的 form 数据
   * @returns {Promise}
   */
  getPureData = () => {
    this.formValidate()
    return formPure()
  }

  render() {
    console.log('Test form render')
    const prefix = 'NEUI'
    const {className, onChange, onSubmit, onFieldChange, ...others} = this.props
    const children = this.initFormField(this.props.children)
    const cls = classNames({
      [`${prefix}_cells`]: true,
      [`${prefix}_cells_form`]: true,
      [className]: className
    })

    return (
      <form className={cls}
            onSubmit={e => this.handleFormSubmit(e)}
            {...others}>
        {children}
      </form>
    )
  }
}
