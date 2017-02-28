[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## 说明
大数据风控组移动端 React 组件

**1.0** 正式版本发布前，组件 API 可能**随时会发生大的变动**，不建议外部项目使用。 

## 开发
### 前提
* Node > 6.0
* Npm > 3.0

## 使用

### 安装
```bash
npm install ne-rc
```
### 引用

```js
	import React from 'react'
	// 引入组件
	import {
	  Form, Input, CheckBox,
	  Cells, Cell, CellTip, CellHeader, CellBody, CellFooter,
	  VerifyButton, Toast, Button
	} from 'ne-rc'
	import Logger from '../../../utils/log'
	import lang from '../../utils/lang'
	import validate from '../../utils/validate'
	
	const logger = new Logger('DEBUG', 'FormDemo')
	
	class FormDemo extends React.Component {
	  constructor() {
	    super()
	    this.state = {  // 初始化需要的数据
	      formData: {
	        name: {value: '抹桥'},
	        phone: {value: '13333333333'},
	        verifyCode: {value: 3303},
	        is: {value: true}
	      },
	      msg: '',
	      isComplete: false,
	      showToast: false
	    }
	  }
	
	  handleSubmit = (isValidate, state, pureData) => { // Form 提交的回调函数
	    if (!isValidate) {
	      this.setState({
	        showToast: true,
	        msg: state.errorMsgList[0]
	      })
	    } else {
	      this.setState({
	        showToast: true,
	        msg: '正在提交'
	      })
	    }
	  }
	  handleChange = (formData) => {  // Form 变化的回调函数
	    this.setState({
	      formData: formData.data,
	      isComplete: formData.isComplete
	    })
	  }
	  handleFieldChange = (FieldData) => { // Form 下面子表单变化的回调函数
	    logger.log('FieldChange', FieldData)
	  }
	  closeToast = () => {
	    this.setState({
	      showToast: false
	    })
	  }
	
	  render() {
	    const {msg, showToast, formData, isComplete} = this.state
	    return (
	      <section className="page-form-demo">
	        <Toast content={msg}
	               show={showToast}
	               onClose={this.closeToast}
	        />
	        <Form onSubmit={this.handleSubmit}
	              onFieldChange={this.handleFieldChange}
	              onChange={this.handleChange}
	              ref={(ref) => {
	                this['$Form'] = ref
	              } }>
	          <Cells>
	            <Cell warning={formData.name.isError}>
	              <CellHeader>Name</CellHeader>
	              <Input type='text'
	                     name='name'
	                     errorMsg={lang.nameErrorMsg}
	                     validate={validate.name}
	                     value={formData.name.value}
	              />
	            </Cell>
	          </Cells>
	          <Cells>
	            <Cell htmlFor="is">
	              <CellBody>Is yourself?</CellBody>
	              <CellFooter><CheckBox name='is' id="is" value={formData.is.value}/></CellFooter>
	            </Cell>
	          </Cells>
	          <Button type="submit" disabled={!isComplete}>提交</Button>
	        </Form>
	      </section>
	    )
	  }
	}
	
	export default FormDemo

```
## 文档
1. [Alert](https://github.com/NE-LOAN-FED/NE-Component/blob/master/components/Alert/README.md)
1. [Button](https://github.com/NE-LOAN-FED/NE-Component/blob/master/components/Button/README.md)
1. [Cell](https://github.com/NE-LOAN-FED/NE-Component/blob/master/components/Cell/README.md)
1. [CellInput](https://github.com/NE-LOAN-FED/NE-Component/blob/master/components/CellInput/README.md)
1. [Collapse](https://github.com/NE-LOAN-FED/NE-Component/blob/master/components/Collapse/README.md)
1. [DatePicker](https://github.com/NE-LOAN-FED/NE-Component/blob/master/components/DatePicker/README.md)
1. [Form](https://github.com/NE-LOAN-FED/NE-Component/blob/master/components/Form/README.md)
1. [Icon](https://github.com/NE-LOAN-FED/NE-Component/blob/master/components/Icon/README.md)
1. [Modal](https://github.com/NE-LOAN-FED/NE-Component/blob/master/components/Modal/README.md)
1. [Picker](https://github.com/NE-LOAN-FED/NE-Component/blob/master/components/Picker/README.md)
1. [Popup](https://github.com/NE-LOAN-FED/NE-Component/blob/master/components/Popup/README.md)
1. [Toast](https://github.com/NE-LOAN-FED/NE-Component/blob/master/components/Toast/README.md)
1. [VerifyButton](https://github.com/NE-LOAN-FED/NE-Component/blob/master/components/VerifyButton/README.md)


## TODO
* [ ] 添加并完善文档
* [ ] 重写部分组件
 * [ ] Form
 * [ ] Collapse
* [ ] Modal 添加动画
* [ ] 样式表结构重新组织
## 列表
* [x] Form          提供表单校验，填写完成校验（决定提交按钮是否高亮）
    - [x] Select    选择器
    - [x] Input     基础输入组件
    - [x] CheckBox
* [x] Button
* [x] verifyButton  验证码
* [x] Cells         Cell 集合
    - [x] Cell      
        * [x] CellHD    Cell 标题
        * [x] CellBD    Cell 主体内容
        * [x] CellFT    Cell 修饰
* [x] Panel         通用展示面板
    - [x] PanelItem
        - [x] PanelContent
* [x] Link
* [x] Icon
* [x] Toast         
* [x] Alert         
* [x] DatePicker    日历
* [X] Collapse      折叠列表

