/**
 * Created by kisnows on 2016/12/26.
 */
import PropTypes from 'prop-types'

import React from 'react'
import classNames from 'classnames'
import { formPure, isFormComplete, isFromValidate } from './FormUtils'
import isEqual from 'lodash/isEqual'

// TODO 完成 Form 重构

// const env = process.env || process.env.NODE_ENV === 'development' ? 'DEBUG' : 'PROD'

// 标识当前 Form 处于的状态
export const enum STATUS {
  Init = 'Init',
  Normal = 'Normal',
  FieldChange = 'FieldChange',
  UpdateFormDataStructure = 'UpdateFormDataStructure',
  Submit = 'Submit'
}

const noop = () => {
}

export interface FormFields extends React.ReactElement<any> {
  data: object
}
export interface FormProps {

}
export interface FormState {
  isComplete: boolean;
  isValidate: boolean;
  errorMsgList: Array<string>;
  data: object;
}
export default class Form extends React.PureComponent<any, FormState> {
  formFields: Array<FormFields>
  field: Array<React.ReactElement<any>>
  CURRENT_STATUS: STATUS
  children: Array<React.ReactElement<any>>
  currentState: FormState
  setStateAndCurrentStatus: (object, STATUS) => void
  static propTypes = {
    onFieldChange: PropTypes.func,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func
  }
  static defaultProps = {
    onFieldChange: noop,
    onChange: noop,
    onSubmit: noop
  }

  constructor (props) {
    super(props)
    this.state = {
      isComplete: false,
      isValidate: false,
      data: {},
      errorMsgList: []
    }
    // 存放 clone 前的原始子组件
    this.formFields = []
    this.children = []
    // 标识当前 Form 处于哪个状态
    this.CURRENT_STATUS = STATUS.Normal
    // 由于 setState 是异步的，所以需要存放一个最新 state 的地方
    this.currentState = Object.assign({}, this.state)
    this.setStateAndCurrentStatus = function (nextState, nextSTATUS) {
      this.currentState = nextState
      this.setState(nextState, () => {
        // eslint-disable-next-line
        typeof nextSTATUS === 'undefined' ? this.CURRENT_STATUS = nextSTATUS : null
      })
    }
  }

  /**
   * 递归遍历收集所有需要管理的表单组件，并注册 handleFieldChange 方法
   * @param children
   * @returns {*} 处理过的 children
   */
  collectFormField = (children) => {
    // TODO 优化性能，当 Field 已经有 id 的时候，就不重新 clone 了
    const handleFieldChange = this.handleFieldChange

    /* 简单粗暴，在 Form 更新的时候直接清空上一次保存的 formFields，全量更新，避免 formFields 内容或者数量发生变化时 this.formFields 数据不正确的问题 */
    const FormFields: Array<React.ReactElement<any>> = this.formFields = []

    /**
     * 用来保存 clone 后的子组件的实例
     */
    const Fields: Array<React.ReactElement<any>> = this.field = []

    function getChildList (children) {
      return React.Children.map(children, (el, i) => {
        // 只要 Name 以 _Field 开头，就认为是需要 From 管理的组件
        if (!el || el === null) return null
        if (typeof el === 'string' || typeof el === 'number') return el
        const reg = /^_Field/
        const childName = el.type && (el.type as any).name
        if (reg.test(childName)) {
          const child = React.cloneElement(el, {
            key: i,
            ref: (ref) => {
              ref && Fields.push(ref)
            },
            handleFieldChange
          })
          FormFields.push(child)
          return child
        } else {
          if (el.props && el.props.children) {
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

    return getChildList(children)
  }
  /**
   * 初始化 FormData 结构，给 this.state.data 添加 id 为表单项 name 的属性
   */
  initFormDataStructure = () => {
    this.CURRENT_STATUS = STATUS.Init
    const formData = {
      ...this.state.data
    }
    this.formFields.forEach((formField) => {
      const Props = formField.props
      // const Data = formField.data
      const Name = Props.name
      // TODO 重写初始化 Form data 方法
      formData[Name] = this.updateFieldData(Props)
    })
    const nextState = {
      ...this.state,
      isComplete: isFormComplete(formData),
      data: formData
    }
    this.handleFormChange(nextState)
    this.setStateAndCurrentStatus(nextState, STATUS.Normal)
  }
  /**
   * 更新 FormData 结构，当 Form 下表单项添加或删除时，将 FormData 结构更新到最新
   */
  updateFormDataStructure = () => {
    this.CURRENT_STATUS = STATUS.UpdateFormDataStructure
    const formData = {
      ...this.currentState.data
    }

    const formItems:Array<string> = []
    // 在 formData 中添加新加入的表单项
    this.formFields.forEach((formField) => {
      const Props = formField.props
      const Name = Props.name
      formItems.push(Name)
      /* 如果新增加了子表单，则添加对应 name 的 id */
      if (typeof formData[Name] === 'undefined') {
        formData[Name] = this.updateFieldData(Props)
      }
    })
    /* TODO 由于 field 没有动态删除，所以暂时做不到从 formData 中去掉删除的表单项 */
    Object.keys(formData).forEach((v) => {
      if (formItems.indexOf(v) === -1) {
        delete formData[v]
      }
    })
    const nextState = {
      ...this.state,
      isComplete: isFormComplete(formData),
      data: formData
    }
    this.handleFormChange(nextState)
    this.setStateAndCurrentStatus(nextState, STATUS.Normal)
  }
  /**
   * 由 Form 管理的子表单变化时触发的回掉函数，会对外触发 onFieldChange 和 onFormChange 事件
   * @param fieldData {object} 由子表单传入的参数
   */
  handleFieldChange = (fieldData) => {
    this.CURRENT_STATUS = STATUS.FieldChange
    // TODO 由于 setState 是异步的，所以这里需要爱一个地方存放临时的 state
    let state = {
      ...this.currentState,
      data: {
        ...this.currentState.data
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
    const nextState = {
      ...state,
      data: {
        ...state.data
      }
    }
    this.handleFormChange(nextState)
    this.setStateAndCurrentStatus(nextState, STATUS.Normal)
  }
  /**
   * Form 发生变化时触发的回调函数，同时对外触发 onFormChange 事件
   * @param state {object} 当前的表单 state
   */
  handleFormChange = (state) => {
    this.props.onChange(state)
  }
  /**
   * 提交事件，对外触发 onSubmit 事件
   */
  formSubmit = () => {
    this.CURRENT_STATUS = STATUS.Submit
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
      formPure({
        ...state.data
      }).then(pureData => onSubmit(isValidate, state, pureData))
    } else {
      onSubmit(isValidate, state, null)
    }
    this.setStateAndCurrentStatus(state, STATUS.Normal)
  }
  handleFormSubmit = (e) => {
    e.preventDefault()
    this.formSubmit()
  }

  get data () {
    return this.state
  }

  componentWillMount () {
    this.children = this.collectFormField(this.props.children)
    this.initFormDataStructure()
  }

  componentWillReceiveProps (nextProps) {
    if (!isEqual(nextProps.children, this.props.children) && this.CURRENT_STATUS !== STATUS.Submit) {
      this.children = this.collectFormField(nextProps.children)
      if (this.CURRENT_STATUS === STATUS.Normal) {
        this.updateFormDataStructure()
      }
    }
  }

  /**
   * 更新子表单的基础数据
   * @param {object} props 传入的 props
   */
  updateFieldData (props) {
    return {
      value: props.value,
      errorMsg: props.errorMsg || `${props.name} 填写错误`,
      validate: props.validate,
      shouldRsa: props.shouldRsa,
      required: typeof props.required === 'undefined' ? true : props.required
    }
  }

  render () {
    const prefix = 'NEUI'
    const {className} = this.props
    const cls = classNames({
      [`${prefix}_cells`]: true,
      [className]: className
    })
    return (
      <form
        className={cls}
        onSubmit={e => this.handleFormSubmit(e)}
      >
        {this.children}
      </form>
    )
  }
}
