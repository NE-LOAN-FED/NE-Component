# CellInput 组件
CellInput 单元格输入，自动根据输入一个字符就选中下一个 cell。 规则如下：
- 每次输入改变都会触发 onchange 事件，输入完成才会触发 onConfirm 事件
- cell 的个数由 maxLength 决定

## 代码示例
```
class Test extends React.Component {
  onChange = () => {
    // ...
  }
  onConfirm = () => {
    // ...
  }
  onError = () => {
    // ...
  }
  render(){
    return (
      <div>
        <CellInput onChange={this.onChange} onConfirm={this.onConfirm} onError={this.onError}/>
      </div>
    )
  }
}
```

## API 
属性名 | 描述 | 类型 | 默认值
--- | --- | --- | ---
prefixCls | 样式前缀 | String | NEUI
value | cellInput 输入值 | String \|\| Number | ''
name | cellInput 名| String | 无
maxLength | cellInput 中输入长度 | Number | 6
type | 输入类型| String | number
onChange | 输入值发生变化回调 | Function | 无
onFocus | 聚焦回调 | Function | 无
onConfirm | 输入完成回调 | Function | 无
onError | 输入值错误回调 | Function | 无
autoFocus | 是否自动聚焦 | Boolean | true
errorMsg | 输入错误显示信息 | String | '输入信息有误'
validate | 验证输入合法函数 | Function | 无
    