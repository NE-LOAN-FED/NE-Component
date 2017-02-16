/**
 * Created by kisnows on 2016/12/26.
 */
import React from 'react'
import classNames from 'classnames'
import {isFormComplete, formPure, isFromValidate} from './TestFormUtils'
import Logger from '../../utils/log'

const PropTypes = React.PropTypes

// TODO 完成 Form 重构

const env = process.env || process.env.NODE_ENV === 'development' ? 'DEBUG' : 'PROD'
const logger = new Logger(env, 'TestForm')
// 标识当前 Form 处于的状态
const STATE = {
  Normal: 'Normal',
  FieldChange: 'FieldChange'
}


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
    this.formFields = []
    this.children = []
    this.CURRENT_STATE = STATE.Normal
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

  componentWillMount() {
    const children = this.props.children
    this.children = this.collectFormField(children)
    this.initFormDataStructure()
    logger.info('WillMount')
  }

  componentDidMount() {
    logger.info('DidMount')
    this.props.onChange({
      ...this.state,
      data: {
        ...this.state.data
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.children !== this.props.children) {
      this.children = this.collectFormField(nextProps.children)
      if (this.CURRENT_STATE === STATE.Normal) {
        this.updateFormDataStructure()
        logger.log('updateFormDataStructure end', this.state)
      }
    }
  }

  componentWillUpdate(nextProps, nextState) {
    logger.log('componentWillUpdate', nextState)
  }

  componentDidUpdate(preProps, preState) {
    logger.log('componentDidUpdate', preState, this.state, this.CURRENT_STATE)
    // this.props.onChange(this.data)
  }

  componentWillUnmount() {
  }

  get data() {
    return this.state
  }

  /**
   * 递归遍历收集所有需要管理的表单组件，并注册 handleFieldChange 方法
   * @param children
   * @returns {*} 处理过的 children
   */
  collectFormField = (children) => {
    // TODO 优化性能，当 Field 已经有 key 的时候，就不重新 clone 了
    logger.log('collectFormField invoke times', this.count)
    this.count++
    const handleFieldChange = this.handleFieldChange

    // 简单粗暴，在 Form 更新的时候直接清空上一次保存的 formFields，全量更新，
    // 避免 formFields 内容或者数量发生变化时 this.formFields 数据不正确的问题
    const FormFields = this.formFields = []

    function getChildList(children) {
      return React.Children.map(children, (el, i) => {
        // 只要 Name 以 Field 开头，就认为是需要 From 管理的组件
        if (!el || el === null) return null

        const reg = /^_Field/
        const childName = el.type.name
        if (reg.test(childName)) {
          FormFields.push(el)
          return React.cloneElement(el, {
            key: i,
            handleFieldChange
          })
        } else {
          if (el.props && el.props.children instanceof Array) {
            const children = getChildList(el.props.children)
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

    const childList = getChildList(children)
    return childList
  }

  /**
   * 初始化 FormData 结构，给 this.state.data 添加 key 为表单项 name 的属性
   */
  initFormDataStructure = () => {
    logger.log('initFormDataStructure')
    const formData = {
      ...this.state.data
    }

    this.formFields.forEach((formField, k) => {
      const Props = formField.props
      const Name = Props.name
      formData[Name] = {
        ...formData[Name],
        required: typeof Props.required === 'undefined' ? true : Props.required
      }
    })

    this.setState({
      ...this.state,
      isComplete: isFormComplete(formData),
      data: formData
    })
  }

  /**
   * 更新 FormData 结构，当 Form 下表单项添加或删除时，将 FormData 结构更新到最新
   */
  updateFormDataStructure = () => {
    const formData = {
      ...this.state.data
    }
    const formItems = []
    // 在 formData 中添加新加入的表单项
    this.formFields.forEach((formField, k) => {
      const Props = formField.props
      const Name = Props.name
      formItems.push(Name)
      if (typeof formData[Name] === 'undefined') {
        formData[Name] = {
          required: typeof Props.required === 'undefined' ? true : Props.required
        }
      }
    })
    // 从 formData 中去掉删除的表单项
    Object.keys(formData).forEach((v) => {
      if (formItems.indexOf(v) === -1) {
        delete formData[v]
      }
    })
    this.setState({
      ...this.state,
      isComplete: isFormComplete(formData),
      data: formData
    })
  }

  handleFieldChange = (fieldData) => {
    this.CURRENT_STATE = STATE.FieldChange
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
    console.log('handleFieldChange', state)
    this.setState({
      ...state,
      data: {
        ...state.data
      }
    }, () => {
      this.CURRENT_STATE = STATE.Normal
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
    // TODO 重写 isFromValidate
    state = isFromValidate(state)
    const isValidate = state.isValidate
    if (isValidate) {
      formPure(state.data)
        .then(pureData => onSubmit(isValidate, state, pureData))
    } else {
      onSubmit(isValidate, state, null)
    }

    this.setState(state)
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
    const {className} = this.props
    const cls = classNames({
      [`${prefix}_cells`]: true,
      [`${prefix}_cells_form`]: true,
      [className]: className
    })
    return (
      <form className={cls}
            onSubmit={e => this.handleFormSubmit(e)}
      >
        {this.children}
      </form>
    )
  }
}
