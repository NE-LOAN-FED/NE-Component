# Form 组件
封装后的 Form 组件，提供校验和检测是否填写完成等功能，分为一下几个组件：

  1. Form 
  1. Input
  1. Select
  1. CheckBox
  
## Form 组件
Form 在加载时会收集他下面所有的 Input 和 Select 组件，然后根据这些表单来做一个 `fromState` 的初始化，并对每个 Input 和 Select 绑定 `formChange` 事件。`Form` 的 state 结构如下：
```
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
```
### formValidate
对当前收集的表单数据进行校验，返回一个当前 `form` 的 `fromState`
### formSubmit(submit)
表单提交动作，将当前的 fromState 处理为可提交的 {key: value} 格式，然后需要提供回调函数用来做真实的提交动作。 
### getPureData
返回一个 `Promise` 对象，处理过后的数据会作为第一个参数。
```javascript
this.form.getPureData()
  .then(data => {})
```
### formCellChange(e)
Form 下面所有的输入动作都会触发这个函数，最终把修改过后的数据作为通过父级传下来的 `onChange` 的第二个参数。这个过程会检测整个 form 是否填写完成，如果完成会修改 `formState` 的 `isComplete` 属性。
### emptyInput(name)
用来传递给 Input 的清除当前输入的方法，`name` 为要清除 `Input` 的 `name` 值。
之所以把这个方法放在这里而没有放在 `Input` 里面，是因为每个 `Input` 都需要这个方法。所以直接在 `Form` 里面就把这个方法传了进去，省去了每个 `Input` 都需要手动传入这一步骤。
### onChange(target,formState)
通过父级 `state` 传下来，接受两个参数。当表单状态有任何修改时,这个函数都会被调用，第一个参数为修改的 DOM target ，第二个为修改后的 `fromState`.
### onSubmit(formState, pureData)
真实的 `submit` 方法，当 Form 组件的 `formSubmit` 方法被调用时这个函数会被调用。
## FormCell
用来包裹实际的表单，用来展示错误等状态。
## Input
input 输入表单，提供一下配置项：

  * disabled
  * name
  * onChange
  * onFocus
  * onBlur
  * onEmpty
  * emptyInput
  * formCellChange
  * shouldRsa
  * required
  * validate
  * errorMsg
  * isError
### onEmpty
调用 emptyInput 清除输入框内容后，会触发这个方法
### emptyInput(name)
当用户输入时，点击输入框右侧的删除按钮触发的事件，如果当前组件包裹在 Form 中，则默认为清除当前 Input 的内容。
### formCellChange
如果当前组件包裹在 Form 中，则默认又 Form 传进来，用来触发整个 Form 的 onChange 事件。
### shouldRsa:(bool)
是否需要加密,默认为 `false`
### required:(bool)
是否为必填，默认为 `true`
### validate:(regular||func)
校验规则
### errorMsg:(string)
校验错误时要现实的信息
### isError:(bool)
当前填写是否错误
## Select
select 表单组件，提供一下配置：
 
* name
* data:
* onChange
* formCellChange
* required

### data
用来渲染 select 内容的数据，格式如下：
```javascript
[{name:'name',code:'code'},{name:'name1',code:'code1'}]
```
如果在 ios 下面，会默认添加一个 ‘请选择’ 的项目进去，因为 ios 上选择第一个选项默认不会触发 change 事件。

## CheckBox
checkbox 表单组件，配置与 `Select` 基本相同，只是不需要 `data` 配置。
