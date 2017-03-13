# Picker 组件

Picker 选择器，在一组数据中选择值。

## 代码示例

```js
class Test extends React.Component {
  constructor(props) {
    super(props)
    this.users = [{
      value: 1,
      label: '张三'
    },{
      value: 2,
      label: '李四'
    }]
  }

  onPickerClose = () => {
    //...
  }

  render(){
    return (
      <div>
        <Picker
          show={true}
          clientItemCount="7"
          children={this.users}
          onValueChange={this.onPickerClose} />
      </div>
    )
  }
}
```

## API

属性名 | 描述 | 类型 | 默认值
--- | --- | --- | ---
prefixCls | 样式前缀 | String | NEUI
defaultSelectedValue | 默认选中值 | String | 无
selectedValue | 选中值 | String | 无
children | 选择列表 | Array<{value,label}> | 无
pure | 如果选择列表发生变化是否深度遍历更新 | Boolean | false
itemHeight | 单个选择元素的高度 | Number | 无
clientItemCount | 选择视口显示地元素数量 | Number | 5
disabled | 是否可选 | Boolean | false
onValueChange | 选择值发生变化回调 | Function | 无