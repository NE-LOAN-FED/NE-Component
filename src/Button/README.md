# Button
按钮组件，展示型组件，不包含特定功能。

## 代码示例

```js
class Test extends React.Component {
  render(){
    return (
      <div>
        <Button>Button Primary</Button>
        <Button role={'secondary'}>Button Secondary</Button>
        <Button disabled={true}>Button Disabled</Button>
        <Button style={'rightAngle'}>Button Primary</Button>
        <Button style={'rightAngle'} role={'secondary'}>Button Secondary</Button>
        <Button style={'rightAngle'} disabled={true}>Button Disabled</Button>
        <Button size={'small'}>Small Button</Button><Button size={'small'} disabled={true}>Small Button</Button>
      </div>
    )
  }
}
```

## API

属性名 | 描述 | 类型 | 默认值
--- | --- | --- | ---
prefixCls | 样式前缀 | String | NEUI
role | 按钮规则，主按钮还是备选按钮 | oneOf(['primary', 'secondary']) | primary
style | 拐角类型 | oneOf(['normal', 'rightAngle']) | normal
disabled | 类型 | Boolean | false
size | 大小 | oneOf(['normal', 'small']) | false
