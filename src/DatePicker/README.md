# DatePicker 组件

DatePicker 日期选择器，当用户开始选择日期，从移动端底部弹出选择框，滑动选择日期。

## 代码示例

```js
class Test extends React.Component {
  onDateChange = () => {
    // ...
  }
  onConfirm = () => {
    // ...
  }
  onCancel = () => {
    // ...
  }
  render(){
    return (
      <div>
        <DatePicker date = {new Date()}
          onDateChange={this.onDateChange}
          onConfirm={this.onConfirm}
          onCancel={this.onCancel} />
      </div>
    )
  }
}
```

## API

属性名 | 描述 | 类型 | 默认值
--- | --- | --- | ---
prefixCls | 样式前缀 | String | NEUI
show | 是否显示日期选择弹框 | Boolean | false
defaultDate | 默认选中日期 | Date \|\| String \|\| Number | 无
date | 选择日期 | Date \|\| String \|\| Number | 无
type | 选择类型（年月，年月日） | oneOf('YMD', 'YM') | 'YMD'
format | 日期格式化 | String \|\| Function | 'yyyy-MM-dd'
maxDate | 最大可选日期 | Date \|\| String \|\| Number | 无
minDate | 最小可选日期 | Date \|\| String \|\| Number | 无
headerContent | 头部内容 | Element | 无
confirmContent | 确认按钮内容 | String | 无
cancelContent | 取消按钮内容 | String | 无
disabled | 是否可用 | Boolean | false
onConfirm | 选择确定回调 | Function | 无
onCancel | 取消回调 | Function | 无
onDateChange | 日期变化回调 | Function | 无
autoFocus | 是否自动聚焦 | Boolean | true
errorMsg | 输入错误显示信息 | String | '输入信息有误'
validate | 验证输入合法函数 | Function | 无