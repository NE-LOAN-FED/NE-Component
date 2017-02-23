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
import {Form, FormCell, Input, Select, CellHeader, CellTip, Button} from 'ne-rc'

class Test extends React.Components {
  render() {
    const {formData} = this.props
    return (
      <section>
      <Form>
        <FormCell isError={formData.realName.isError}
                  cellsStart
                  cellsEnd >
          <CellHeader>姓名</CellHeader>
          <Input type="text"
                 name="realName"
           />
          </FormCell>
        </Form>
        <Button>提交</Button>
      </section>
    )
  }
}
```


## TODO
* [ ] 添加并完善文档
* [ ] 重写 Form
* [ ] 添加组件使用 Demo 页面

## 列表
* [x] Form          提供表单校验，填写完成校验（决定提交按钮是否高亮）
    - [x] FromCell  表单 Cell，用以嵌套实际的表单内容（select,input,checkbox）
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

## 文档
1. [Alert]('/NE-LOAN-FED/blob/master/components/Alert/README.md')
1. [Button]('/NE-LOAN-FED/blob/master/components/Button/README.md')
1. [Cell]('/NE-LOAN-FED/blob/master/components/Cell/README.md')
1. [CellInput]('/NE-LOAN-FED/blob/master/components/CellInput/README.md')
1. [Collapse]('/NE-LOAN-FED/blob/master/components/Collapse/README.md')
1. [DatePicker]('/NE-LOAN-FED/blob/master/components/DatePicker/README.md')
1. [Form]('/NE-LOAN-FED/blob/master/components/Form/README.md')
1. [Icon]('/NE-LOAN-FED/blob/master/components/Icon/README.md')
1. [Modal]('/NE-LOAN-FED/blob/master/components/Modal/README.md')
1. [Picker]('/NE-LOAN-FED/blob/master/components/Picker/README.md')
1. [Popup]('/NE-LOAN-FED/blob/master/components/Popup/README.md')
1. [Toast]('/NE-LOAN-FED/blob/master/components/Toast/README.md')
1. [VerifyButton]('/NE-LOAN-FED/blob/master/components/VerifyButton/README.md')
