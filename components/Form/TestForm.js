/**
 * Created by kisnows on 2016/12/26.
 */
import React from 'react'
import classNames from 'classnames'
import Field from './Field'
import {isFormComplete, formPure, isFromValidate} from './TestFormUtils'
import Logger from '../../utils/log'
import create from './createFormField.js'

const PropTypes = React.PropTypes

// TODO 完成 Form 重构

const env = process.env || process.env.NODE_ENV === 'development' ? 'DEBUG' : 'PROD'
const logger = new Logger(env, 'TestForm')

export default class Form extends React.PureComponent {
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
    this.FormFields = []
  }

  static propTypes = {
    onFieldChange: PropTypes.func,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    isComplete: PropTypes.bool,
    isValidate: PropTypes.bool,
    data: PropTypes.object,
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
    // logger.log('componentDidUpdate',preState, this.data)
    // this.props.onChange(this.data)
  }

  componentWillUnmount() {
  }

  get data() {
    return this.state
  }

  initFormField = (children) => {
    // TODO 优化性能，当 Field 已经有 key 的时候，就不重新 clone 了
    logger.log('initFormField invoke times', this.count)
    this.count++
    const handleFieldChange = this.handleFieldChange

    // 简单粗暴，在 Form 更新的时候直接清空上一次保存的 FormFields，全量更新，
    // 避免 FormFields 内容或者数量发生变化时 this.FormFields 数据不正确的问题
    const FormFields = this.FormFields = []

    /**
     * 收集所有需要管理的表单组件，并注册 handleFieldChange 方法
     */
    return React.Children.map(children, (el, i) => {
      // 只要 Name 以 Field 开头，就认为是需要 From 管理的组件
      const reg = /^_Field/
      const childName = el.type.name
      if (!el) return null
      if (reg.test(childName)) {
        FormFields.push(el)
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
      data: {
        ...this.state.data
      }
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
    this.props.onFieldChange(fieldData)

    // 为了避免传入 state 被外界修改，所以传入一个新的对象
    this.props.onChange({
      ...state,
      data: {
        ...state.data
      }
    })

    this.setState({
      ...state,
      data: {
        ...state.data
      }
    })
  }
  handleFormSubmit = (e) => {
    e.preventDefault()
    const {onSubmit} = this.props
    let state = {
      ...this.state,
      data: {
        ...this.state.data
      }
    }
    state = isFromValidate(state)
    const isValidate = state.isValidate
    logger.log('state', state)
    if (isValidate) {
      formPure(state.data)
        .then(pureData => onSubmit(isValidate, state, pureData))
    } else {
      onSubmit(isValidate, state, null)
    }
    this.setState({
      ...state,
      data: {
        ...this.state.data
      }
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
    logger.log('render')
    const prefix = 'NEUI'
    const {className, onChange, onSubmit, onFieldChange} = this.props
    const children = this.initFormField(this.props.children)
    const cls = classNames({
      [`${prefix}_cells`]: true,
      [`${prefix}_cells_form`]: true,
      [className]: className
    })
    return (
      <form className={cls}
            onSubmit={e => this.handleFormSubmit(e)}
      >
        {children}
      </form>
    )
  }
}
