/**
 * Created by kisnows on 2017/2/7.
 */
  // Form 表单的输入数据格式应该是如下格式
const FormStateSchema =
    {
      'isValidate': 'boole',  // 决定是否能提交
      'errorMsg': '',         // 放第一条错误信息
      'isComplete': 'boole',   // 决定提交按钮是否高亮
      'data': {
        'name': {             // 每条表单的属性
          'value': 'value',   // 表单的值
          'validate': /[a-z]/,  // 校验方法
          'isError': 'boole', // 是否通过校验
          'errorMsg': '',         // 错误信息
          'shouldRsa': 'boole',   // 是否需要加密
          'required': 'boole'     // 是否为必填项
        },
        'name1': {
          'value': 'value',
          'validate': function (value) {
            return true
          },
          'isValidate': 'boole',
          'errorMsg': '',
          'shouldRsa': 'boole',
          'required': 'boole'
        }
      }
    }

/**
 * 判断 Form 是否完全填写，用来决定提交按钮是否高亮,判断完成后修改 formData 的 canSubmit 字段
 * @param formData 表单数据
 * @returns {boolean} 是否完成
 */
function isFormComplete(formData) {
  const dataList = Object.keys(formData)
  let shouldInput = 0
  let actualInput = 0
  dataList.forEach((v) => {
    const required = formData[v].required
    const value = formData[v].value
    const minLength = formData[v].minLength
    if (required) shouldInput += 1
    if (required && value && (typeof value === 'string' ? value.trim().length > 0 : true)) {
      if (minLength) {
        if (value.trim().length >= minLength) {
          actualInput += 1
        }
      } else {
        actualInput += 1
      }
    }
  })
  return actualInput >= shouldInput
}

/**
 * 处理 Form 数据，根据每一条数据是否合法,把第一条错误的信息放到 FormState 的 errorMsg 里面,并根据整体验证结果修改 formState.isValidate 值。
 * 如果没有错误，需要清空 errorMsg 字段。
 * 要注意，这里直接修改了传入的 formState 对象。（考虑是否需要进行深拷贝，返回新的对象，不直接修改原来的 formState）
 * @param formState {object} 表单数据
 * @returns {object} 修改后的新的 formState 对象
 */
function isFromValidate(formState) {
  console.log(123, formState)
  let state = {
    ...formState,
    errorMsgList: [],
    data: {
      ...formState.data
    }
  }
  let isValidate = false
  const formData = state.data
  const formDataList = Object.keys(formData)
  for (let i = formDataList.length - 1; i--;) {
    const key = formDataList[i]
    const value = formData[key]
    const isError = value.isError
    if (isError) {
      state.errorMsgList.push(value.errorMsg)
      isValidate = false
      break
    } else {
      isValidate = true
    }
  }
  state.isValidate = isValidate
  return state
}

/**
 * 对 fromData 进行处理，返回如下可以直接提交的数据。
 * {
 *  'name':'value'
 * }
 * @param formData 表单数据存储每一条具体字段的 data 对象，即 fromState.data
 * @returns {Promise}
 */
function formPure(formData) {
  // TODO 加密功能后续补上
  const pureData = {}
  const promises = []
  return new Promise((resolve, reject) => {
    Object.keys(formData).forEach((v, k) => {
      if (formData[v].shouldRsa) {
        // TODO 加密功能
        // promises.push(
        //   RSA(formData[v].value)
        //     .then(val =>pureData[v] = val)
        //     .catch(err =>reject(err))
        // )
      } else {
        pureData[v] = formData[v].value
      }
    })
    Promise.all(promises)
      .then(() => resolve(pureData))
      .catch(err => resolve(err))
  })
}

export {
  isFormComplete,
  isFromValidate,
  formPure
}
