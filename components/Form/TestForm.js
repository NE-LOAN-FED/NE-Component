/**
 * Created by kisnows on 2016/12/26.
 */
import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import Field from './Field'
import {isFormComplete, formPure, isFromValidate} from './FormUtils'

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
  }

  static propTypes = {
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
  }

  componentDidUpdate() {
  }

  get data() {
    return this.state
  }

  initFormField = () => {
    const children = this.props.children
    React.Children.map(children, (el, i) => {

    })
  }

  handleFieldChange = (fieldData) => {
    let state = this.state
    let name = fieldData.name
    if (state.data[name]) {
      state.data[name] = {
        ...state.data[name],
        fieldData
      }
    } else {
      state.data[name] = fieldData
    }
    state.isComplete = isFormComplete(state.data)
    this.setState({
      ...state
    })
    this.props.onChange(fieldData)
  }

  handleFormSubmit = () => {
    const {onSubmit} = this.props
    let state = this.state
    state = isFromValidate(state)
    if (state.isValidate) {
      formPure(state.data)
        .then(pureData => onSubmit(state, pureData))
    } else {
      onSubmit(state, null)
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
    const prefix = 'NEUI'
    const {children, className, onChange, onSubmit, ...others} = this.props
    const cls = classNames({
      [`${prefix}_cells`]: true,
      [`${prefix}_cells_form`]: true,
      [className]: className
    })

    return (
      <form className={cls}
            onSubmit={this.handleFormSubmit}
            {...others}>
        {children}
      </form>
    )
  }
}
