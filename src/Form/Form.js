/**
 * Created by kisnows on 2016/12/26.
 */
import React from 'react'
import classNames from 'classnames'
import {isFormComplete, formPure, isFromValidate} from './FormUtils'

const PropTypes = React.PropTypes

// TODO 完成 Form 重构

const env = process.env || process.env.NODE_ENV === 'development' ? 'DEBUG' : 'PROD'
// 标识当前 Form 处于的状态
const STATE = {
  Init: 'Init',
  Normal: 'Normal',
  FieldChange: 'FieldChange',
  UpdateFormDataStructure: 'UpdateFormDataStructure'
}

const noop = () => {
}

export default class Form extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isComplete: false,
      isValidate: false,
      data: {},
      errorMsgList: []
    }
    this.count = 1
    this.field = []
    this.formFields = []
    this.children = []
    this.CURRENT_STATE = STATE.Normal
  }

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

  componentWillMount() {
    this.children = this.collectFormField(this.props.children)
  }

  componentDidMount() {
    this.initFormDataStructure()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.children !== this.props.children) {
      this.children = this.collectFormField(nextProps.children)
      if (this.CURRENT_STATE === STATE.Normal) {
        this.updateFormDataStructure()
      }
    }
  }

  componentWillUpdate(nextProps, nextState) {
  }

  componentDidUpdate(preProps, preState) {
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
    this.count++
    const handleFieldChange = this.handleFieldChange

    /* 简单粗暴，在 Form 更新的时候直接清空上一次保存的 formFields，全量更新，避免 formFields 内容或者数量发生变化时 this.formFields 数据不正确的问题 */
    const FormFields = this.formFields = []

    const Fields = this.field = []

    function getChildList(children) {
      return React.Children.map(children, (el, i) => {
        // 只要 Name 以 _Field 开头，就认为是需要 From 管理的组件
        if (!el || el === null) return null

        const reg = /^_Field/
        const childName = el.type && el.type.name
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
   * 初始化 FormData 结构，给 this.state.data 添加 key 为表单项 name 的属性
   */
  initFormDataStructure = () => {
    this.CURRENT_STATE = STATE.Init
    const formData = {
      ...this.state.data
    }
    this.field.forEach((formField, k) => {
      const Props = formField.props
      const Data = formField.data
      const Name = Props.name
      // TODO 重写初始化 Form data 方法
      formData[Name] = {
        ...Data,
        required: typeof Props.required === 'undefined' ? true : Props.required
      }
    })
    const nextState = {
      ...this.state,
      isComplete: isFormComplete(formData),
      data: formData
    }
    this.handleFormChange(nextState)
    this.setState(nextState, () => {
      this.CURRENT_STATE = STATE.Normal
    })
  }

  /**
   * 更新 FormData 结构，当 Form 下表单项添加或删除时，将 FormData 结构更新到最新
   */
  updateFormDataStructure = () => {
    this.CURRENT_STATE = STATE.UpdateFormDataStructure
    const formData = {
      ...this.state.data
    }

    const formItems = []
    // 在 formData 中添加新加入的表单项
    this.formFields.forEach((formField, k) => {
      const Props = formField.props
      const Name = Props.name
      formItems.push(Name)
      /* 如果新增加了子表单，则添加对应 name 的 key */
      if (typeof formData[Name] === 'undefined') {
        formData[Name] = {
          ...Props,
          required: typeof Props.required === 'undefined' ? true : Props.required
        }
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
    this.setState(nextState, () => {
      this.CURRENT_STATE = STATE.Normal
    })
  }

  /**
   * 由 Form 管理的子表单变化时触发的回掉函数，会对外触发 onFieldChange 和 onFormChange 事件
   * @param fieldData {object} 由子表单传入的参数
   */
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
    const nextState = {
      ...state,
      data: {
        ...state.data
      }
    }
    this.handleFormChange(nextState)
    this.setState({
      ...state,
      data: {
        ...state.data
      }
    }, () => {
      this.CURRENT_STATE = STATE.Normal
    })
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

    this.setState(state)
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    this.formSubmit()
  }

  render() {
    const prefix = 'NEUI'
    const {className} = this.props
    const cls = classNames({
      [`${prefix}_cells`]: true,
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
