/**
 * Created by hzyuanqi1 on 2016/9/12.
 */
import React from 'react'
import classNames from 'classnames'
import {Input, Select, CheckBox} from './index'
import {isFormComplete, formPure, isFromValidate} from './FormUtils'
import cloneDeep from 'lodash/cloneDeep'

const PropTypes = React.PropTypes

export default class Form extends React.Component {
  constructor(props) {
    super(props)
    this.Forms = []
    this.formState = Object.assign({}, {
      isComplete: false,
      isValidate: false,
      errorMsg: '',
      data: {}
    }, this.props.formState)
  }

  static propTypes = {
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    formState: PropTypes.object
  }

  static defaultProps = {
    onChange: () => {
    },
    onSubmit: () => {
    }
  }

  componentDidMount() {
    this.initFormData()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.formState !== this.formState) {
      this.formState = nextProps.formState
      this.formState.isComplete = isFormComplete(nextProps.formState.data)
    }
  }

  componentDidUpdate() {
    this.initFormData()
  }

  /**
   * 初始化 FromData，创建一个包含每个 fromCell 数据的对象
   */
  initFormData = () => {
    const formData = this.formState.data
    const Forms = this.Forms
    const formItems = []
    for (let i = Forms.length; i--;) {
      const thisForm = Forms[i].props
      formItems.push(thisForm.name)
      formData[thisForm.name] = {
        ...formData[thisForm.name],
        isError: thisForm.isError,
        shouldRsa: thisForm.shouldRsa,
        required: thisForm.required,
        errorMsg: thisForm.errorMsg,
        validate: thisForm.validate,
        minLength: thisForm.minLength,
        maxLength: thisForm.maxLength
      }
    }
    // FIXME 解决 formcell 动态删除可能会导致的问题
    /* Object.keys(formData).forEach((v) => {
     if (formItems.indexOf(v) === -1) {
     delete formData[v]
     }
     }) */
    // 解决初始化 form 本来就填写完毕下，无法提交的问题
    this.formState.isComplete = isFormComplete(this.formState.data)
  }

  /**
   * 检测 form 是否校验通过，结果会体现在 formState.isValidate 上
   * @returns {*} 一个完整的 formState
   */
  formValidate = () => {
    isFromValidate(this.formState)
    return cloneDeep(this.formState)
  }

  formSubmit = () => {
    const {onSubmit} = this.props
    this.formValidate()
    this.props.onChange(null, this.formState)
    if (this.formState.isValidate) {
      /**
       *  调用外部 submit 函数用来做实际的提交操作
       *  @param 表单的状态
       *  @param 用于提交的实际表单内容
       */
      formPure(this.formState.data)
        .then(pureData => onSubmit(this.formState, pureData))
    } else {
      onSubmit(this.formState, null)
    }
  }
  /**
   * 获得当前的 formState
   * @returns {*}
   */
  getFormState = () => {
    return cloneDeep(this.formState)
  }
  /**
   * 获得当前最新的处理并加密后的 form 数据
   * @returns {Promise}
   */
  getPureData = () => {
    this.formValidate()
    return formPure(this.formState.data)
  }

  /**
   * 每一条包裹在 form 下面的真实表单的修改都会触发这个方法
   * @param target {object} 事件对象
   * @param type {string} 事件类型，为了区分不同的表单类型修改
   */
  formCellChange = (target, type) => {
    if (type === 'checkbox') {
      this.formState.data[target.name].value = target.checked ? 'true' : ''
    } else {
      this.formState.data[target.name].value = target.value
    }
    this.formState.data[target.name].isError = false
    this.formState.isComplete = isFormComplete(this.formState.data)
    this.props.onChange(target, this.formState)
  }

  /**
   * 清除包裹 input 的方法
   * @param name {string} 要清除 input 的 name
   */
  emptyInput = (name) => {
    this.formState.data[name].value = ''
    this.formState.isComplete = isFormComplete(this.formState.data)
    this.props.onChange(null, this.formState)
  }

  render() {
    console.log('render Form')
    const {children, className, onChange, onSubmit, formState, ...others} = this.props
    const cls = classNames({
      NEUI_cells: true,
      NEUI_cells_form: true,
      [className]: className
    })
    // 简单粗暴，在 Form 更新的时候直接清空上一次保存的 formCells，全量更新，避免 formCell 内容或者数量发生变化时 this.formCells 数据不正确的问题
    const Forms = this.Forms = []
    const formCellChange = this.formCellChange
    const emptyInput = this.emptyInput

    /**
     * 获取 form 下面每一个表单对象，注入属性，并收集起来
     * @param children
     * @returns {*}
     */
    function getForms(children) {
      return React.Children.map(children, (el, i) => {
        if (!el) {
          return null
        }
        switch (el.type) {
          case Input:
            Forms.push(el)
            return React.cloneElement(
              el,
              {
                key: i,
                formCellChange,
                emptyInput
              }
            )
          case Select:
            Forms.push(el)
            return React.cloneElement(
              el,
              {
                key: i,
                formCellChange
              }
            )
          case CheckBox:
            Forms.push(el)
            return React.cloneElement(
              el,
              {
                key: i,
                formCellChange
              }
            )
          default:
            if (el.props && el.props.children instanceof Array) {
              const children = getForms(el.props.children)
              return React.cloneElement(
                el,
                {
                  key: i,
                  children
                }
              )
            } else {
              return el
            }
        }
      })
    }
    const chi = getForms(children)
    console.log(chi)
    return (
      // 不使用默认表单，因为按回车键会触发表单提交事件
      <div className={cls}
           {...others}>
        {chi}
      </div>
    )
  }
}
